'use server';

import { ActionResult } from '@/lib/actions/action-type';
import { LoginInput, RegisterInput, registerSchema } from '@/lib/schemas/auth';
import z from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@/lib/db/prisma';
import { PrismaClientKnownRequestError } from '@/lib/db/generated/prisma/internal/prismaNamespace';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/lib/auth';

export async function registerAction(
  input: RegisterInput,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: z.flattenError(parsed.error),
    };
  }

  const { email, password } = parsed.data;

  const hashed = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        success: false,
        message: 'This email address is already in use',
        code: 'EMAIL_ALREADY_EXIST',
        details: { email },
      };
    }
    throw error;
  }

  redirect('/login');
}

export async function login(
  input: LoginInput,
  redirectTo?: string | null,
): Promise<ActionResult> {
  try {
    await signIn('credentials', { ...input, redirect: false });
  } catch {
    return {
      success: false,
      message: 'Email or password is incorrect',
      code: 'INVALID_CREDENTIALS',
    };
  }
  redirect(redirectTo ?? '/dashboard');
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/login' });
}
