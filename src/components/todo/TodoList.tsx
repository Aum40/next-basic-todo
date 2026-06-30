import TodoItem from '@/components/todo/TodoItem';
import { fetchTodo } from '@/lib/data/todo';

type TodoListProps = {
  query?: Record<string, string | string[] | undefined>;
};

export default async function TodoList({ query }: TodoListProps) {
  const searchTerm = Array.isArray(query?.q) ? query.q[0] : query?.q;

  const todos = await fetchTodo({ searchTerm });
  return (
    <div className="border-y border-y-gray-200 divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
