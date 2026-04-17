import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./lib/models/user.model";
import bcrypt from "bcrypt";
import {
  BETTER_AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./lib/database/config";
import Google from "next-auth/providers/google";
import { connectDatabase } from "./lib/database/connectdb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await connectDatabase();
        const { email, password } = credentials;
        if (!email || !password) {
          console.log("Email and password are required");
          return null;
        }
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
          email: userExist?.email.toLowerCase(),
          image: userExist?.image,
          role: userExist?.role,
        };
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      await connectDatabase();
      if (!user?.email) return false;
      const isGoogleProvider = account?.provider === "google";
      const email = user.email.trim().toLowerCase();
      let userExist = await User.findOne({
        email: email,
      });

      if (!userExist) {
        userExist = await User.create({
          name: user?.name,
          email: email,
          image: user?.image,
          googleId: isGoogleProvider ? profile?.sub : undefined,
        });
      }

      let updateNeeded = false;
      if (userExist?.image !== user?.image) {
        userExist.image = user?.image;
        updateNeeded = true;
      }
      if (isGoogleProvider) {
        if (userExist.googleId !== profile?.sub) {
          userExist.googleId = profile?.sub;
          updateNeeded = true;
        }
      }
      if (updateNeeded) {
        await userExist.save();
      }

      user.id = userExist._id.toString();
      user.role = userExist.role;
      user.image = userExist.image;
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (account) {
        token.accountProvider = account.provider;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      // if (trigger === "update") {
      //   console.log("UPDATE TRIGGER FIRED");
      //   const dbUser = await User.findById(token.id).select("role");
      //   console.log("DB USER:", dbUser);
      //   if (dbUser) {
      //     token.role = dbUser.role;
      //   }
      // }
      await connectDatabase();
      const dbUser = await User.findById(token.id).select("role");
      token.role = dbUser?.role;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.provider = token.accountProvider;
      }
      return session;
    },
  },
  secret: BETTER_AUTH_SECRET,
});
