const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, forbidden, notFound } = require('../../utils/auth');
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
            forbidden(res)
            return;
        }
    
        await image.destroy();
    
        res.json({
            message: "Successfully deleted"
        })

    } catch (error) {
        notFound(res, "Spot Image")
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
            forbidden(res)
            return;
        }
    
        await image.destroy();
    
        res.json({
            message: "Successfully deleted"
        });

    } catch (error) {
        notFound(res, "Review Image");
        return;
    }

})





module.exports = router;