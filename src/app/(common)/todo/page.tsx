import SearchTodo from '@/components/todo/SearchTodo';
import TodoList from '@/components/todo/TodoList';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Todo'
};

export default async function TodoPage(props: PageProps<'/todo'>) {
  const search = await props.searchParams;
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl p-8 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Todo List</h1>

        <div className="flex justify-between gap-8">
          <SearchTodo />
          <Link href="/todo/create" className="bg-gray-200 rounded-lg p-2">
            Create Todo
          </Link>
        </div>

        <TodoList query={search} />
      </div>
    </main>
  );
}
