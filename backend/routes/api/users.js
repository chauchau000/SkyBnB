const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 charactors or more'),
  handleValidationErrors
]

//SIGNUP
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

//Get all Spots owned by the Current User
router.get('/:userid/spots', requireAuth, async (req, res, next) => {
  const { user } = req;
  const id = user.id;
  const userSpots = await Spot.findAll({
    where: {
      userId: id
    }
  })

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
})


module.exports = router;


