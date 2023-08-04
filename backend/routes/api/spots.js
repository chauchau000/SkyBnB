const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser, requireAuth, forbidden, notFound, spotNotFound, bookingConflict, spotAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, sequelize, Review, ReviewImage, Booking } = require('../../db/models');
const { dateRange } = require('../../utils/dates')
const { handleValidationErrors, validateReview, validateBooking, validateQueries } = require('../../utils/validation');
const booking = require('../../db/models/booking');

const router = express.Router()


const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        // .isLength({ max: 50 })
        .withMessage("Name is required"),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 30 })
        .withMessage('Description needs a minimum of 30 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price is required'),
    handleValidationErrors
]

const validateImage = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Preview image is required'),
    check('url')
        .custom(value => {
            let check = false;
            if (value.endsWith('.png')) check = true;
            if (value.endsWith('.jpeg')) check = true;
            if (value.endsWith('.jpg')) check = true
            if (!check) {
                throw new Error("Image URL must end with .png, .jpg, or .jpeg")
            } else { return true}
            
        }),
    handleValidationErrors
]



//GET ALL SPOTS 


router.get('/', validateQueries, async (req, res, next) => {
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query

    if (page === undefined) {
        page = 1
    } else {
        page = parseInt(page);
        if (page > 10) page = 10;
    }

    if (size === undefined) {
        size = 20
    } else {
        size = parseInt(req.query.size);
        if (size > 20) size = 20;
    }

    let pagination = {
        limit: size,
        offset: size * (page - 1)
    }

    let where = {}
    if (maxLat) where.lat = { [Op.lte]: maxLat }
    if (minLat) where.lat = { ...where.lat, [Op.gte]: minLat }

    if (maxLng) where.lng = { [Op.lte]: maxLng }
    if (minLng) where.lng = { ...where.lng, [Op.gte]: minLng }

    if (maxPrice) where.price = { [Op.lte]: maxPrice }
    if (minPrice) where.price = { ...where.price, [Op.gte]: minPrice }

    const allSpots = await Spot.findAll({
        where,
        order: [["id"]],
        ...pagination
    });

    //set previewImage key/value pair
    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i];
        const image = await SpotImage.findOne(
            { where: { spotId: spot.id, preview: true } });
        if (image) {
            spot.dataValues.previewImage = image.url
        } else {
            spot.dataValues.previewImage = null
        };

        const spotAvgRating = await Spot.findByPk(spot.id, {
            include: { model: Review, attributes: [] },
            attributes: {
                include: [
                    [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 2), "avgRating"]
                ]
            },
            group: ['Spot.id']
        });
        const avgRating = Number(spotAvgRating.dataValues.avgRating).toFixed(2)
        

        if (spotAvgRating) spot.dataValues.avgRating = avgRating;
    };

    res.json({ Spots: allSpots, page, size })
})

//Get details of a Spot from an id // 
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id);

    if (!spot) {
        notFound(res, "Spot");
        return;
    }

    const spotResult = await Spot.findByPk(id, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']

            },
            {
                model: Review,
                attributes: []
            },
            {
                model: User,
                as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            },
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("stars")), "numReviews"
                ],

                [
                    sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 2), "avgStarRating"
                ],
            ]
        },
        group: ["Spot.id", "Owner.id", "SpotImages.id"],
    });
    spotResult.dataValues.avgStarRating = Number(spotResult.dataValues.avgStarRating).toFixed(2)


    res.json(spotResult);

})


//CREATE A SPOT  

router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;

    const newSpot = Spot.build({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: user.id
    })

    await newSpot.save();
    res.statusCode = 201;
    res.json(newSpot)
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, validateImage, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        notFound(res, "Spot")
        return;
    } else if (spot.ownerId !== user.id) {
        forbidden(res);
        return;
    }

    const existingImage = await SpotImage.findOne({
        where: {
            spotId,
            preview: true
        }
    })

    if (existingImage && preview === true) {
        return res.status(403).json({ message: "This spot already has a previewImage: true" })
    }

    const newImage = SpotImage.build({
        url,
        preview,
        spotId
    })
    await newImage.save()

    res.json({
        id: newImage.dataValues.id,
        url: newImage.dataValues.url,
        preview: newImage.dataValues.preview

    })
});

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        notFound(res, "Spot")
        return;
    } else if (spot.ownerId !== user.id) {
        forbidden(res);
        return;
    }

    spot.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })

    await spot.save();
    res.json(spot)
})

// DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const { user } = req;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        notFound(res, "Spot")
        return;
    } else if (spot.ownerId !== user.id) {
        forbidden(res);
        return;
    }

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    })
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', spotNotFound, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spotReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User.scope('basic')
            },
            {
                model: ReviewImage.scope('basic')
            }
        ],
        order: [

            ['createdAt', 'DESC']
        ]
        
    })

    res.json({ Reviews: spotReviews })
})


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, spotNotFound, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const { review, stars } = req.body;

    const reviewByUser = await Review.findOne({
        where: {
            userId: user.id,
            spotId: spotId
        }
    })

    if (reviewByUser) {
        res.statusCode = 500;
        res.json({
            message: "User already has a review for this spot"
        })
        return;
    }

    const newReview = Review.build({
        userId: user.id,
        spotId,
        review,
        stars
    })

    await newReview.save();
    res.statusCode = 201;
    res.json(newReview)
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        notFound(res, "Spot")
        return;
    } else if (spot.ownerId !== user.id) {
        const bookings = await Booking.scope('basic').findAll({
            where: {
                spotId
            }
        })
        res.json({ Bookings: bookings })
    } else if (spot.ownerId === user.id) {
        const bookings = await Booking.findAll({
            where: {
                spotId
            },
            include: {
                model: User.scope('basic')
            }
        });
        res.json({ Bookings: bookings })
    }
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, spotNotFound, spotAuth, validateBooking, bookingConflict, async (req, res, next) => {
    const { user } = req;
    const { startDate, endDate } = req.body;
    const spotId = req.params.spotId;

    const newBooking = Booking.build({
        spotId,
        userId: user.id,
        startDate,
        endDate
    })

    await newBooking.save()

    res.json(newBooking)
});





module.exports = router;