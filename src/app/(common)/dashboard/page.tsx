import { CardSkeletonGroup } from '@/components/dashboard/Skeleton';
import StatOverview from '@/components/dashboard/StatOverview';
import TodoList from '@/components/todo/TodoList';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <main className='flex flex-col gap-8 p-8'>
      <Suspense fallback={<CardSkeletonGroup />}>
        <StatOverview />
      </Suspense>
      <div className='bg-white rounded-2xl p-8'>
        <h2 className='text-2xl font-bold mb-8'>Latest Todo</h2>
        {/* <Suspense fallback={<TodoListSkeleton />}> */}
        <TodoList />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
