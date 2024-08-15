import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import { connectToDB } from "@/libs/mongoDB";

import User from '../../../libs/models/User';

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with the email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Password is incorrect');
        }

        return { email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
