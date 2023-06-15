const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, notFound, forbidden, bookingAuth, bookingNotFound, bookingConflict} = require('../../utils/auth');
const { handleValidationErrors, validateBooking } = require('../../utils/validation')
const { Spot, SpotImage, User, sequelize, Review, ReviewImage, Booking } = require('../../db/models');
const { dateRange } = require('../../utils/dates')

const router = express.Router()


// Edit a booking // need to figure out how to prevent booking for already booked dates
router.put('/:bookingId', requireAuth, validateBooking, bookingNotFound, bookingAuth, async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body
    const currentDate = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    const booking = await Booking.findByPk(bookingId);
    
    
    if (new Date(booking.dataValues.startDate) < currentDate) {
        res.statusCode = 403;
        res.json({
            message: "Past bookings can't be modified"
        });
        return
    }

    const spotId = booking.dataValues.spotId;

    const existingBookings = await Booking.findAll({
        where: {
            spotId
        }
    })

    for (let i = 0; i < existingBookings.length; i++) {
        let existingBooking = existingBookings[i]; 
        let existingStart = new Date (existingBooking.dataValues.startDate);
        let existingEnd = new Date (existingBooking.dataValues.endDate);

        if (start >= existingStart && start <= existingEnd) {
            res.statusCode = 403;
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                }
            });
            return;
        } else if (end >= existingStart && end <= existingEnd) {
            res.statusCode = 403;
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
            });
            return;
        }
    }

    booking.set({
        startDate,
        endDate
    })

    await booking.save();
    
    res.json(booking);

});

// Delete a booking  
router.delete('/:bookingId', requireAuth, bookingNotFound, async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const currentDate = new Date();

    const booking = await Booking.findOne({
        where: { id: bookingId },
        include: { model: Spot, attributes: ['ownerId'] }
    });

    const ownerId = booking.dataValues.Spot.dataValues.ownerId

    if ((booking.dataValues.userId !== user.id) && (user.id !== ownerId)) {
        forbidden(res)
        return
    }
    const startDate = new Date(booking.dataValues.startDate);

    if (startDate <= currentDate) { 
        res.statusCode = 403;
        res.json({
            message: "Bookings that have been started can't be deleted"
        })
        return;
    }

    await booking.destroy()
    res.json({
        message: "Successfully deleted"
    })
})




module.exports = router;