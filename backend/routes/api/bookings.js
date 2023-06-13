const express = require('express');
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require ('../../utils/validation')
const { Spot, SpotImage, User, sequelize, Review, ReviewImage, Booking } = require('../../db/models');
const { dateRange } = require('../../utils/dates')

const router = express.Router()


// Edit a booking // need to figure out how to prevent booking for already booked dates
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req; 
    const bookingId = req.params.bookingId; 
    const { startDate, endDate } = req.body

    const booking = await Booking.findByPk(bookingId);



});

// Delete a booking  //Booking must belong to the current user or the Spot must belong to the current user
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId; 
    const currentDate = new Date ();
    

    const booking = await Booking.findOne({
        where: { id: bookingId },
        include: { model: Spot, attributes: ['ownerId'] }
    });

    const ownerId = booking.dataValues.Spot.dataValues.ownerId
     
    console.log("ownerid" + ownerId);
    console.log("user id:" + booking.dataValues.userId)
    console.log("result:" + ((booking.dataValues.userId !== ownerId)))
    
    if (!booking) {
        res.statusCode = 403;
        res.json( {
            message: "Booking couldn't be found"
        }); 
        return;
    } else if ( (booking.dataValues.userId !== user.id) && (user.id !== ownerId)) {
        res.statusCode = 403;
        res.json( {
            message: "Forbidden"
        });
        return
    } 
    const startDate = new Date(booking.dataValues.startDate);
    
    if (startDate <= currentDate) { //should you be allowed to be able to delete bookings from the same day?
        res.statusCode = 403;
        res.json( {
            message: "Bookings that have been started can't be deleted"
        })
        return;
    }



    await booking.destroy()
    res.json( {
        message: "Successfully deleted"
    })
})




module.exports = router;