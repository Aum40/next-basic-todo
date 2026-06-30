import {
  CardSkeleton,
  CardSkeletonGroup
} from '@/components/dashboard/Skeleton';
import StatCard from '@/components/dashboard/StatCard';
import { countTodoByStatus } from '@/lib/data/todo';

export default async function StatOverview() {
  const { completed, pending } = await countTodoByStatus();

  return (
    <CardSkeletonGroup />
    // <div className="grid grid-cols-3 gap-8">
    //   <StatCard label="Total" amount={completed + pending} />
    //   <StatCard label="Completed" amount={completed} />
    //   <StatCard label="Pending" amount={pending} />
    // </div>
  );
}
