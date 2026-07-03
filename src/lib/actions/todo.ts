'use server';

import prisma from '@/lib/db/prisma';
import { LoginInput, transformTodoFormSchema } from '@/lib/schemas/todo';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn, signOut } from '@/lib/auth/todo';

export async function createTodo(input: unknown) {
  const parsed = transformTodoFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false };
  }

  await prisma.todo.create({ data: parsed.data });
  // return { success: true };
  redirect('/todo');
}

export async function updateTodo(id: number, input: unknown) {
  const parsed = transformTodoFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false };
  }

  await prisma.todo.update({ data: parsed.data, where: { id } });
  // return { success: true };
  redirect('/todo');
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({ where: { id } });
  // refresh();
  revalidatePath('/todo');
}

export async function registerAction(input: LoginInput) {
  const hashed = await bcrypt.hash(input.password, 12);
  await prisma.user.create({
    data: {
      email: input.email,
      password: hashed,
    },
  });
  redirect('/login');
}

export async function login(input: LoginInput) {
  await signIn('credentials', { ...input, redirectTo: '/dashboard' });
}

export async function logout() {
  await signOut();
}
