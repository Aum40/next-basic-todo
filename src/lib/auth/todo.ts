import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import prisma from '../db/prisma';
import { loginSchema } from '../schemas/todo';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(input: unknown) {
        const data = loginSchema.parse(input);
        const user = await prisma.user.findFirst({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
          return null;
        }
        // return null or throw any error ===> login failed
        // return User { id, name, email, image } ===> login success
        return {
          id: user.id.toString(),
          email: user.email,
          name: 'muamua',
          picture: 'aaaaa',
          gender: 'male',
        };
      },
    }),
    Google({}),
    GitHub({}),
  ],
});
