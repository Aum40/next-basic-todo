import z from 'zod';

export const todoFormSchema = z.object({
  title: z.string().trim().min(1, 'Title cannot be empty'),
  status: z.enum(['false', 'true']),
});

export const transformTodoFormSchema = todoFormSchema.transform((value) => ({
  ...value,
  status: value.status === 'true',
}));

export type TodoFormInput = z.infer<typeof todoFormSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
