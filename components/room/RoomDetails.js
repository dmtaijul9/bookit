import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../redux/actions/roomActions";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import RoomFeatures from "./RoomFeatures";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import {
  checkBooking,
  getBookedDates,
} from "../../redux/actions/checkBookingAction";

import axios from "axios";

const RoomDetails = () => {
  const dispatch = useDispatch();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [daysOfStay, setDaysOfStay] = useState(null);
  const router = useRouter();

  const { id } = router.query;

  const { user } = useSelector((state) => state.loadedUser);
  const { room, error } = useSelector((state) => state.roomDetails);
  const { available, loading } = useSelector((state) => state.checkBooking);
  const { dates } = useSelector((state) => state.bookedDates);

  const excludedDates = [];

  dates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  console.log(excludedDates);

  useEffect(() => {
    dispatch(getBookedDates({ id }));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, []);

  const dateOnChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // console.log(checkInDate.toISOString(), checkOutDate.toISOString());

      const daysOfStay = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );

      setDaysOfStay(daysOfStay);

      dispatch(
        checkBooking({
          roodId: id,
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
        })
      );
    }
  };

  const newBookingHandler = async () => {
    const bookingData = {
      roomId: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data, status } = await axios.post(
        "/api/booking",
        bookingData,
        config
      );

      console.log("response", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room?.name}</h2>

      <div className="ratings mt-auto mb-3">
        <div className="rating-outer">
          <div
            className="rating-inner"
            style={{ width: `${(room?.ratings / 5) * 100}%` }}
          ></div>
        </div>
        <span id="no_of_reviews">({room?.numOfReviews} Reviews)</span>
      </div>

      <Carousel pause="hover">
        {room &&
          room.images?.map((image) => {
            return (
              <Carousel.Item key={image._id}>
                <Image src={image.url} alt="room pic" layout="fill" />
              </Carousel.Item>
            );
          })}
      </Carousel>

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="booking-card shadow-lg p-4">
            <p className="price-per-night">
              <b>${room.pricePerNight}</b> / night
            </p>

            <hr />

            <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

            <DatePicker
              className="w-100"
              selected={checkInDate}
              onChange={dateOnChange}
              startDate={checkInDate}
              endDate={checkOutDate}
              excludeDates={excludedDates}
              selectsRange
              inline
            />

            {available === true && (
              <div className="alert alert-success my-3 font-weight-bold">
                Room is available, Book now.
              </div>
            )}
            {available === false && (
              <div className="alert alert-danger my-3 font-weight-bold">
                Room is not available, try different dates.
              </div>
            )}

            {available && !user && (
              <div className="alert alert-danger my-3 font-weight-bold">
                Login first to book room.
              </div>
            )}

            {available && user && (
              <button
                className="btn btn-block py-3 booking-btn"
                onClick={newBookingHandler}
              >
                Pay
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="reviews w-75">
        <h3>Reviews:</h3>
        <hr />
        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <p className="review_user">by John</p>
          <p className="review_comment">Good Quality</p>

          <hr />
        </div>

        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <p className="review_user">by John</p>
          <p className="review_comment">Good Quality</p>

          <hr />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
