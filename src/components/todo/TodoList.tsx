import TodoItem from '@/components/todo/TodoItem';
import { fetchTodo } from '@/lib/data/todo';

export default async function TodoList() {
  const todos = await fetchTodo();
  return (
    <div className="border-y border-y-gray-200 divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
