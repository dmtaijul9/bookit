import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";

import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      authorize: async (credentials, req) => {
        dbConnect();
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please enter email or password");
        }

        const user = await User.findOne({ email }).select("+password");

        // That is not a goot error message . Because Hacker can attack easily if i use this error.

        if (!user) {
          throw new Error("Invalid email address");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        // That is not a goot error message . Because Hacker can attack easily if i use this error.
        if (!isPasswordMatched) {
          throw new Error("Password does not match!");
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: (token, user) => {
      user && (token.user = user);

      return Promise.resolve(token);
    },
    session: (session, token) => {
      session.user = token.user;

      return Promise.resolve(session);
    },
  },
});
