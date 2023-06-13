const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, forbidden, notFound } = require('../../utils/auth');
const { Spot, SpotImage, User, sequelize, Review, ReviewImage, Booking } = require('../../db/models');
const { dateRange } = require('../../utils/dates')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router()


//GET ALL SPOTS // need to put in aggregate data
router.get('/', async (req, res, next) => {

    let page;
    let size;
    if (req.query.page === undefined) {
        page = 1
    } else {
        page = parseInt(req.query.page);
        if (page > 10) page = 10;
        if (page < 1) {
            res.statusCode = 400;
            res.json({
                message: "Bad Request",
                errors: {
                    page: "Page must be greater than or equal to 1",
                    size: "Size must be greater than or equal to 1"
                }
            });
            return
        };
    }

    if (req.query.size === undefined) {
        size = 1
    } else {
        size = parseInt(req.query.size);
        if (size > 20) size = 20;
        if (size < 1) {
            res.statusCode = 400;
            res.json({
                message: "Bad Request",
                errors: {
                    page: "Page must be greater than or equal to 1",
                    size: "Size must be greater than or equal to 1"
                }
            });
            return
        }
    }

    let pagination = {
        limit: size,
        offset: size * (page - 1)
    }

    const allSpots = await Spot.findAll({
        include: { model: Review, attributes: [] },
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
                ]
            ]
        },
        group: ["Spot.id"],
        pagination
    });


    for (let i = 0; i < allSpots.length; i++) {
        let spot = allSpots[i];
        const image = await SpotImage.findOne(
            {
                where: {
                    spotId: spot.id,
                    preview: true
                }
            })
        if (image) spot.dataValues.previewImage = image.url;
    }

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
                model: User,
                as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.col("Reviews.id")),
                    "numReviews"
                ],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ],
            ]
        },
    });

    res.json(spotResult);

})

//CREATE A SPOT  

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;

    if (!(address && city && state && country && lat && lng && name && description && price)) {
        res.statusCode = 400;
        res.json({
            message: "Bad Request",
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
        return;
    }

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

    res.json(newSpot)
});

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);
    if (!spot || spot.ownerId !== user.id) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found"
        })
        return;
    } else if (!(url && preview)) {
        const error = new Error('url and preview are required');
        res.statusCode = 400;
        res.json(error.message);
        return;
    }

    const newImage = SpotImage.build({
        url,
        preview,
        spotId
    })
    await newImage.save()

    const imageResult = await SpotImage.findOne({
        where: newImage.id,
        attributes: ['id', 'url', 'preview']
    });

    res.json(imageResult)
});

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(spotId);
    if (!spot || spot.ownerId !== user.id) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found"
        })
        return;
    } else if (!(address && city && state && country && lat && lng && name && description && price)) {
        res.statusCode = 400;
        res.json({
            message: "Bad Request",
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
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
router.delete('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found"
        })
        return;
    }

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    })
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
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
        ]
    })

    res.json({ Reviews: spotReviews })
})


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId);
    const reviewByUser = await Review.findOne({
        where: {
            userid: user.id,
            spotId: spotId
        }
    })

    if (!(review && stars)) {
        res.statusCode = 400;
        res.json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }
        })
        return;
    } else if (!spot) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found"
        })
        return;
    } else if (reviewByUser) {
        res.statusCode = 500;
        res.json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = Review.build({
        userId: user.id,
        spotId,
        review,
        stars
    })

    await newReview.save();

    res.json(newReview)
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found"
        });
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
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { startDate, endDate } = req.body;
    const newDates = dateRange(startDate, endDate)
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const bookings = await Booking.findAll({
        where: {
            spotId
        }
    });

    let bookedDates = []

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];
        //console.log(booking)
        let dates = dateRange(booking.dataValues.startDate, booking.dataValues.endDate);
        bookedDates.push(...dates)
    }
    // console.log(bookedDates);
    // console.log(newDates)
    // console.log(newDates.some( date => bookedDates.includes(date)))

    if (!spot) { // tested
        res.statusCode = 404;
        res.json({
            message: "Spot couldn't be found"
        });
        return
    } else if (spot.ownerId === user.id) { // tested
        res.statusCode = 403;
        res.json({
            message: "Forbidden"
        });
        return
    } else if (startDate >= endDate) { // tested
        res.statusCode = 400;
        res.json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
        return
    } else if (bookedDates.some(date => newDates.includes(date))) { //this is not working
        res.statusCode = 403;
        res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    const newBooking = Booking.build({
        spotId,
        userId: user.id,
        startDate,
        endDate
    })

    await newBooking.save()

    res.json(newBooking)
});

router.get('/', async (req, res, next) => {
    let query = {
        where: {},
        include: []
    };

    let page;
    let size;
    if (req.query.page === undefined) {
        page = 1
    } else {
        page = parseInt(req.query.page);
        if (page > 10) page = 10;
        if (page < 1) page = 1;
    }

    if (req.query.size === undefined) {
        size = 1
    } else {
        size = parseInt(req.query.size);
        if (size > 20) size = 20;
        if (size < 1) size = 1;
    }

    query.limit = size;
    query.offset = size * (page - 1);


});

module.exports = router;