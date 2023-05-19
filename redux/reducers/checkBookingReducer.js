import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/bookingConstants";

export const checkBookingReducer = (state = { available: null }, action) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      };

    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };

    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      };

    case CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return {
        dates: [...action.payload],
      };

    case BOOKED_DATES_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
