import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./mongo";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials ?? {};
          if (!email || !password) return null;
          console.log(email, password);
          await dbConnect();
          const user = await User.findOne({ email });

          if (!user) throw new Error("User not found");
          console.log(user);
          const isValid = await bcrypt.compare(
            password as string,
            user.password
          );
          if (!isValid) throw new Error("Incorrect password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image || null,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Called during sign in and token refresh
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach custom properties to session
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name;
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT sessions
  },
});
