'use client';

import { registerAction } from '@/lib/actions/auth';
import { cn } from '@/lib/cn';
import { RegisterInput, registerSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '' },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      const result = await registerAction(data);
      if (!result.success) {
        if (result.code === 'EMAIL_ALREADY_EXIST') {
          setError('email', { message: 'Email already in use' });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6'>
        <div className='grid gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            className={cn(
              'w-full px-3 py-1.5 rounded-lg border outline-none',
              errors.email ? 'border-red-500' : 'border-gray-200',
            )}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>

        <div className='grid gap-1'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className={cn(
              'w-full px-3 py-1.5 rounded-lg border outline-none',
              errors.password ? 'border-red-500' : 'border-gray-200',
            )}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-75 inline-flex justify-center'
          disabled={isPending}
        >
          {isPending ? <Loader className='animate-spin' /> : 'Create account'}
        </button>
      </div>
    </form>
  );
}
