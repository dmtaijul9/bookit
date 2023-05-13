import nc from "next-connect";

import onError from "../../../middlewares/errors";

import { forgotPassword } from "../../../controllers/authControllers";
import dbConnect from "../../../config/dbConnect";

const handler = nc({ onError });

dbConnect();

handler.post(forgotPassword);

export default handler;
