const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth, notFound, forbidden, bookingAuth, bookingNotFound, bookingConflict} = require('../../utils/auth');
const { handleValidationErrors, validateBooking } = require('../../utils/validation')
const { Spot, SpotImage, User, sequelize, Review, ReviewImage, Booking } = require('../../db/models');
const { dateRange } = require('../../utils/dates')

const router = express.Router()


// Edit a booking // need to figure out how to prevent booking for already booked dates
router.put('/:bookingId', requireAuth, bookingNotFound, validateBooking, bookingAuth, async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body
    const currentDate = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    const booking = await Booking.findByPk(bookingId);
    
    
    if (new Date(booking.dataValues.startDate) < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        });
    }
    // PUT THIS IN VALIDATE BOOKING
    // if (start <= currentDate) { 
    //     return res.status(403).json({
    //         message: "Bookings may not be made for a past date"
    //     });
    // }

    const spotId = booking.dataValues.spotId;

    const existingBookings = await Booking.findAll({
        where: {
            spotId,
            id: {
                [Op.not]: bookingId
            }
        }
    });

    for (let i = 0; i < existingBookings.length; i++) {
        let existingBooking = existingBookings[i];
        let existingStart = new Date(existingBooking.dataValues.startDate);
        let existingEnd = new Date(existingBooking.dataValues.endDate);
    
        //new booking sandwiches old booking
        if (start <= existingStart && end >= existingEnd) {
          const err = Error('Sorry, this spot is already booked for the specified dates');
          err.title = 'Invalid booking'
          err.errors = {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
          err.status = 403;
          return next(err);
        
        //old booking sandwiches new booking
        //start date is equal two or inbetween existing booked dates 
        //AND end date is equal to or inbetween existing booked dates
        } else if ((start >= existingStart && start <= existingEnd) && (end >= existingStart && end <= existingEnd)) {
          const err = Error('Sorry, this spot is already booked for the specified dates');
          err.title = 'Invalid booking'
          err.errors = {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
          err.status = 403;
          return next(err);
        
        //start date is equal to or inbetween existing booked dates
        } else if (start >= existingStart && start <= existingEnd) {
          const err = Error('Sorry, this spot is already booked for the specified dates');
          err.title = 'Invalid booking'
          err.errors = {
            startDate: "Start date conflicts with an existing booking",
          }
          err.status = 403;
          return next(err);
        
          //end date is equal to or inbetween existing booked dates
        } else if (end >= existingStart && end <= existingEnd) {
          const err = Error('Sorry, this spot is already booked for the specified dates');
          err.title = 'Invalid booking'
          err.errors = {
            endDate: "End date conflicts with an existing booking"
          }
          err.status = 403;
          return next(err);
        }
      };

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
        return forbidden(res)
    }
    const startDate = new Date(booking.dataValues.startDate);

    if (startDate <= currentDate) { 
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        });
    }

    await booking.destroy()
    res.json({
        message: "Successfully deleted"
    })
})




module.exports = router;