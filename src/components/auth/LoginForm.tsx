'use client';

import { login } from '@/lib/actions/auth';
import { cn } from '@/lib/cn';
import { LoginInput, loginSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const result = await login(data, searchParams.get('callbackUrl'));
      if (!result.success) {
        if (result.code === 'INVALID_CREDENTIALS') {
          setError('root', {
            message: 'The email or password you entered is incorrect',
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6'>
        {errors.root && (
          <div className='bg-red-200 text-red-500 p-3 rounded-lg'>
            {errors.root.message}
          </div>
        )}

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
          {isPending ? <Loader className='animate-spin' /> : 'Login'}
        </button>
      </div>
    </form>
  );
}
