import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import {
  authReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  userReducer,
} from "./authReducer";
import {
  bookedDatesReducer,
  bookingDetailsReducer,
  checkBookingReducer,
  myBookingsReducer,
} from "./checkBookingReducer";

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  loadedUser: loadedUserReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: myBookingsReducer,
  bookingDetails: bookingDetailsReducer,
});

export default reducers;
