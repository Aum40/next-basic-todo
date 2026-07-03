'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <main className=' flex items-center justify-center min-h-screen'>
      <h1>500</h1>
      <h2>internal server error;</h2>
      <h3>We apologize for the inconvenience. plese try again later</h3>
      <Link href='/'>Go home</Link>
    </main>
  );
}
