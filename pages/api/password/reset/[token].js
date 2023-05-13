import nc from "next-connect";
import onError from "../../../../middlewares/errors";
import { resetPassword } from "../../../../controllers/authControllers";
import dbConnect from "../../../../config/dbConnect";

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword);

export default handler;
