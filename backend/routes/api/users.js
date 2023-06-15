const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors, validateSignup } = require('../../utils/validation')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();



//SIGNUP
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const allUsers = await User.findAll({
    attributes: ['email', 'username']
  });

  for (let i = 0; i < allUsers.length; i++) {
    let user = allUsers[i];
    console.log(user)
    if (user.dataValues.email === email) {
      res.statusCode = 500;
      res.json({
        message: "User already exists",
        errors: {
          email: "User with that email already exists"
        }
      });
      return;
    } else if (user.dataValues.username === username) {
      res.statusCode = 500;
      res.json({
        message: "User already exists",
        errors: {
          email: "User with that username already exists"
        }
      });
      return;
    }
  }

  const hashedPassword = bcrypt.hashSync(password);
  const newUser = await User.create({ firstName, lastName, email, username, hashedPassword });

  const safeUser = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    username: newUser.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
});

//Get all Spots owned by the Current User
router.get('/spots', requireAuth, async (req, res, next) => {
  const id = req.user.id;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: id
    }
  });

  for (let i = 0; i < userSpots.length; i++) {
    let spot = userSpots[i];
    const avgRatingData = await Review.findAll({
        where: {
            spotId: spot.dataValues.id
        }, 
        attributes: {
            include: [
                [
                    sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("stars"))), "avgRating"
                ]
            ]
        }, 
        group: ["id"],

    })

    if (avgRatingData[0].dataValues.avgRating) {
        spot.dataValues.avgRating = avgRatingData[0].dataValues.avgRating
    }

    const image = await SpotImage.findOne(
        {
            where: {
                spotId: spot.id,
                preview: true
            }
        })
    if (image) spot.dataValues.previewImage = image.url;
}

  res.json({ Spots: userSpots })
})

// GET ALL REVIEWS OF THE CURRENT USER

router.get('/reviews', requireAuth, async (req, res, next) => {
  const { user } = req;

  const userReviews = await Review.findAll({
    where: {
      userId: user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot.scope('basic'),
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })


  for (let i = 0; i < userReviews.length; i++) {
    let userReview = userReviews[i];
    let spot = userReview.Spot;
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
  res.json({ Reviews: userReviews })
});

// Get all of the Current User's Bookings

router.get('/bookings', requireAuth, async (req, res, next) => {
  const { user } = req;
  const userBookings = await Booking.findAll({
    where: {
      userId: user.id
    },
    include: {
      model: Spot.scope('basic')
    }
  })

  for (let i = 0; i < userBookings.length; i++) {
    let userBooking = userBookings[i];
    let spot = userBooking.Spot;
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

  res.json({ Bookings: userBookings })
})


module.exports = router;


