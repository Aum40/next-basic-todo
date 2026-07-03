import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className='p-8 max-w-xl mx-auto'>
      <div className='bg-white rounded-2xl p-8 flex flex-col gap-8'>
        <h1 className='text-2xl'>Create new account</h1>
        {/* RegisterForm */}
        <RegisterForm />
        <span>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-500'>
            Login
          </Link>
        </span>
      </div>
    </main>
  );
}
