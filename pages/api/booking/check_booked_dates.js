import nc from "next-connect";

import onError from "../../../middlewares/errors";
import { checkBookedDatesOfRoom } from "../../../controllers/bookingController";
import dbConnect from "../../../config/dbConnect";

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler;
