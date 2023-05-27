import nc from "next-connect";
import onError from "../../../middlewares/errors";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import { getBookingDetails } from "../../../controllers/bookingController";

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(getBookingDetails);

export default handler;
