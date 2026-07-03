import LoginForm from '@/components/auth/LoginForm';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className='p-8 max-w-xl mx-auto'>
      <div className='bg-white rounded-2xl p-8 flex flex-col gap-8'>
        <h1 className='text-2xl'>Log in to your account</h1>
        {/* LoginForm */}
        <LoginForm />
        <span>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='text-blue-500'>
            Register
          </Link>
        </span>
      </div>
    </main>
  );
}
