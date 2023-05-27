import axios from "axios";
import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERRORS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS,
} from "../constants/bookingConstants";
import absoluteUrl from "next-absolute-url";

export const checkBooking =
  ({ roodId, checkInDate, checkOutDate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST });

      const link = `/api/booking/check?roomId=${roodId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const { data } = await axios.get(link);

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getBookedDates =
  ({ id }) =>
  async (dispatch) => {
    try {
      const link = `/api/booking/check_booked_dates?roomId=${id}`;

      const { data } = await axios.get(link);

      dispatch({
        type: BOOKED_DATES_SUCCESS,
        payload: data.bookedDates,
      });
    } catch (error) {
      dispatch({
        type: BOOKED_DATES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const myBookings = (authCookies, req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        cookie: authCookies,
      },
    };

    const { data } = await axios.get(`${origin}/api/booking/me`, config);

    dispatch({
      type: MY_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const bookingDetails = (authCookies, req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const config = {
      headers: {
        cookie: authCookies,
      },
    };

    const { data } = await axios.get(`${origin}/api/booking/${id}`, config);

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data.booking,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
