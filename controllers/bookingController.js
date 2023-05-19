import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking";
import cloudinary from "cloudinary";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

//Config Coudinary setting

//create a new booking => /api/booking

const newBooking = catchAsyncErrors(async (req, res, next) => {
  const {
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    roomId,
    paymentInfo,
  } = req.body;

  console.log(checkInDate);

  const booking = await Booking.create({
    user: req.user._id,
    room: roomId,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paymentInfo,
    paidAt: Date.now(),
  });

  console.log(booking);
  res.status(200).json({
    success: true,
    booking,
  });
});

const checkRoomBookingAvailablity = catchAsyncErrors(async (req, res, next) => {
  const { checkInDate, checkOutDate, roomId } = req.query;

  const booking = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  let isAvailable;

  if (booking && booking.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// Check booked date of room  => /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res, next) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({
    room: roomId,
  });

  let bookedDates = [];

  bookings.forEach((booking) => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    );

    const dates = Array.from(range.by("day"));

    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

export { newBooking, checkRoomBookingAvailablity, checkBookedDatesOfRoom };
