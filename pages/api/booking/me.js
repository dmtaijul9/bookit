import nc from "next-connect";
import onError from "../../../middlewares/errors";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import { myBookings } from "../../../controllers/bookingController";

const handler = nc({ onError });

handler.use(isAuthenticatedUser).get(myBookings);

export default handler;
