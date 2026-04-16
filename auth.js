import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./lib/models/user.model";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        // check if the user exist
        const userExist = await User.findOne({ email: email.trim() }).select(
          "+password",
        );

        if (!userExist) {
          console.log("User does not exist");
          return null;
        }
        // check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
          password,
          userExist?.password,
        );

        if (!isPasswordCorrect) {
          console.log("Invalid email or password");
          return null;
        }

        return {
          id: userExist?._id.toString(),
          name: userExist?.name,
          email: userExist?.email,
          image: userExist?.image,
          role: userExist?.role,
        };
      },
    }),
  ],
});
