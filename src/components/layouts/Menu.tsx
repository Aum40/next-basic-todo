import MenuItem from '@/components/layouts/MenuItem';

import { auth } from '@/lib/auth';
import LogoutButton from './LogoutButton';
export default async function Menu() {
  const session = await auth();
  return (
    <nav className='flex gap-4'>
      {session ? (
        <>
          <MenuItem href='/dashboard' label='Dashboard' />
          <MenuItem href='/todo' label='Todo' />
          <LogoutButton />
          {/* <form action={logout}>
            <button>Logout</button>
          </form> */}
        </>
      ) : (
        <>
          <MenuItem href='/login' label='Login' />
          <MenuItem href='/register' label='Register' />
        </>
      )}
    </nav>
  );
}
