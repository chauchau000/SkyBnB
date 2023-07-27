const { validationResult } = require('express-validator');
const { check } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors.array().forEach(error => {
            errors[error.path] = `${error.msg}`
        });

        const err = Error('Bad request');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request'
        next(err);
    }
    next();
}

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
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

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('State date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage("End Date is required"),
    check('endDate').custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
            throw new Error('endDate cannot be on or before startDate');
        };
        return true;
    }),
    check('startDate').custom( (value, { req }) => {
        const currentDate = new Date();
        if (new Date(value) <= currentDate) {
            throw new Error('Bookings cannot be made in the past');
        };
        return true;
    }),
    handleValidationErrors
]

const validateQueries = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    check('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Minimum latitude is invalid"),
    check('minLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Maximum longitude is invalid"),
    check('maxLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Minimum longitude is invalid"),
    check('minPrice')
        .optional()
        .isInt({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
]



module.exports = { handleValidationErrors, validateReview, validateSignup, validateBooking, validateQueries }

