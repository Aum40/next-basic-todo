import prisma from '@/lib/db/prisma';
import { loginSchema } from '@/lib/schemas/auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(input) {
        const { email, password } = loginSchema.parse(input);
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return null;
        }

        return { id: user.id.toString(), email: user.email };
      },
    }),
  ],
});

export async function getAuthUser() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return session.user;
}
