import { getSession } from "next-auth/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import { MDBDataTable } from "mdbreact";
import { clearError } from "../../redux/actions/checkBookingAction";
import Image from "next/image";

const BookingDetails = () => {
  const dispatch = useDispatch();

  const { booking, error } = useSelector((state) => state.bookingDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        {booking && booking.room && booking.user && (
          <div className="col-12 col-lg-8 mt-5 booking-details">
            <h2 className="my-5">Booking # {booking._id}</h2>

            <h4 className="mb-4">User Info</h4>
            <p>
              <b>Name:</b> {booking.user.name}
            </p>
            <p>
              <b>Email:</b> {booking.user.email}
            </p>
            <p>
              <b>Amount:</b> ${booking.amountPaid}
            </p>

            <hr />

            <h4 className="mb-4">Booking Info</h4>
            <p>
              <b>Check In:</b>{" "}
              {new Date(booking.checkInDate).toLocaleString("en-US")}
            </p>
            <p>
              <b>Check Out:</b>{" "}
              {new Date(booking.checkOutDate).toLocaleString("en-US")}
            </p>
            <p>
              <b>Days of Stay:</b> {booking.daysOfStay}
            </p>

            <hr />

            <h4 className="my-4">Payment Status</h4>
            <p className="greenColor">
              <b>Paid</b>
            </p>

            <h4 className="mt-5 mb-4">Booked Room:</h4>

            <hr />
            <div className="cart-item my-1">
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <Image
                    src={booking.room.images[0].url}
                    alt={booking.room.name}
                    width={45}
                    height={65}
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <a href={`/room/${booking.room._id}`}>{booking.room.name}</a>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${booking.room.pricePerNight}</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{booking.daysOfStay} Day(s)</p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
