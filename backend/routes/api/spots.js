const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, sequelize, Review } = require('../../db/models');


const router = express.Router()


//GET ALL SPOTS // need to put in aggregate data
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        // attributes: {
        //     include: [
        //         [
        //             sequelize.fn("AVG", sequelize.col("Reviews.stars")), 
        //             "avgRating"
        //         ]
        //     ],
        // },
        // include: {
        //     model: Review,
        //     attributes: []
        // }
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
        if (image) {
           spot.dataValues.previewImage = image.url
        }
    }

    res.json({ Spots: allSpots })
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findOne({
        where: {
            ownerId: id
        },
        // attributes: {
        //     include: [
        //         [
        //             sequelize.fn("AVG", sequelize.col("Reviews.stars")), 
        //             "avgStarRating"
        //         ]

        //     ]
        // },
        include: [
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, 
        {
            model: Review,
            attributes: []
        }
        ]
    });

    if (!spot) {
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found"
        })
    }

    res.json(spot)
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
        const error = new Error ('url and preview are required');
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
        attributes: ['id', 'url', 'preview']});

    res.json(imageResult)
});

//Edit a Spot
router.put('/:spotId', requireAuth, async(req, res, next) => {
    const spotId = req.params.spotId;
    const {user} = req;
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
})

module.exports = router;