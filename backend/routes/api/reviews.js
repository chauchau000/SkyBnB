const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, forbidden } = require('../../utils/auth');
const { Spot, SpotImage, User, sequelize, Review, ReviewImage } = require('../../db/models');
const { handleValidationErrors } = require ('../../utils/validation')


const router = express.Router()

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);
    const imageCount = await ReviewImage.count({
        where: {
            reviewId
        }
    })

    if (!review) {
        res.statusCode = 404;
        res.json( {
            message: "Review couldn't be found"
        });
        return;
    } else if (imageCount >= 10) {
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
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;

    const oldReview = await Review.findByPk(reviewId);

    if (!(review && stars)) {
        res.statusCode = 400;
        res.json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }
        });
        return;
    } else if (!oldReview) {
        res.statusCode = 404;
        res.json( {
            message: "Review couldn't be found"
        })
    }

    oldReview.set({
        review,
        stars
    })

    await oldReview.save();
    res.json(oldReview)

});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.statusCode = 404;
        res.json({
            message: "Review couldn't be found"
        });
        return;
    } else if (review.userId !== user.id) {
        forbidden(res);
        return
    }

    await review.destroy();

    res.json({
        message: "Successfully deleted"
    })
})





module.exports = router;