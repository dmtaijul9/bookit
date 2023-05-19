import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";
import { checkRoomBookingAvailablity } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomBookingAvailablity);

export default handler;
