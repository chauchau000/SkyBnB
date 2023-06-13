const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, forbidden } = require('../../utils/auth');
const { Spot, SpotImage, User, sequelize, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors } = require ('../../utils/validation')


const router = express.Router()



//Delete a Spot Image 

router.delete('/spotImage/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const { user } = req;

    try {
        const image = await SpotImage.findOne({
            where: {
                id: imageId
            }, 
            include: {
                model: Spot,
                attributes: ['ownerId']
            }
        });
        
        const ownerId = image.dataValues.Spot.dataValues.ownerId

        if (user.id !== ownerId) {
            res.statusCode = 403;
            res.json({
                message: "Forbidden"
            })
            return;
        }
    
        await image.destroy();
    
        res.json({
            message: "Successfully deleted"
        })

    } catch (error) {
        res.statusCode = 404;
        res.json({
            message: "Spot Image couldn't be found"
        });
    }

});


// Delete a Review Image

router.delete('/reviewImage/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const { user } = req;

    try {
        const image = await ReviewImage.findOne({
            where: {
                id: imageId
            }, 
            include: {
                model: Review,
                attributes: ['userId']
            }
        });
        
        const userId = image.dataValues.Review.dataValues.userId

        if (user.id !== userId) {
            res.statusCode = 403;
            res.json({
                message: "Forbidden"
            })
            return;
        }
    
        await image.destroy();
    
        res.json({
            message: "Successfully deleted"
        })

    } catch (error) {
        res.statusCode = 404;
        res.json({
            message: "Review Image couldn't be found"
        });
    }

})





module.exports = router;