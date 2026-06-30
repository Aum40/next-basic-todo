import StatCard from '@/components/dashboard/StatCard';
import { countTodoByStatus } from '@/lib/data/todo';
import { delay } from '@/lib/delay';

export default async function StatOverview() {
  await delay();
  const { completed, pending } = await countTodoByStatus();

  return (
    <div className="grid grid-cols-3 gap-8">
      <StatCard label="Total" amount={completed + pending} />
      <StatCard label="Completed" amount={completed} />
      <StatCard label="Pending" amount={pending} />
    </div>
  );
}
