const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, forbidden, notFound, reviewNotFound } = require('../../utils/auth');
const { Spot, SpotImage, User, sequelize, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors, validateReview } = require ('../../utils/validation')


const router = express.Router()

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, reviewNotFound, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { url } = req.body;

    const imageCount = await ReviewImage.count({
        where: {
            reviewId
        }
    })

    if (imageCount >= 10) {
        res.statusCode = 403,
        res.json( {
            message: "Maximum number of images for this resource was reached"
        })
    }

    const reviewImage = ReviewImage.build( {
        reviewId,
        url
    })

    await reviewImage.save();
    res.json( reviewImage )
})

//Edit a Review
router.put('/:reviewId', requireAuth, validateReview, reviewNotFound, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;
    const { user } = req;

    const oldReview = await Review.findByPk(reviewId);

    oldReview.set({
        review,
        stars
    })

    await oldReview.save();
    res.json(oldReview)

});

// Delete a Review
router.delete('/:reviewId', requireAuth, reviewNotFound, async (req, res, next) => {
    const { user } = req;
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    await review.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;