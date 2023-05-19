import axios from "axios";
import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
} from "../constants/bookingConstants";

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

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
