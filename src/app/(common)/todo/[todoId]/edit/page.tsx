import TodoForm from '@/components/todo/TodoForm';
import { updateTodo } from '@/lib/actions/todo';
import { getTodoById } from '@/lib/data/todo';
import { TodoFormInput } from '@/lib/schemas/todo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Todo',
};

export default async function EditTodoPage(
  props: PageProps<'/todo/[todoId]/edit'>,
) {
  const { todoId } = await props.params;

  if (isNaN(+todoId)) {
    throw new Error('invalid parameter type Todo');
  }

  const todo = await getTodoById(+todoId);
  if (!todo) {
    notFound();
  }

  const defaultValues: TodoFormInput = {
    title: todo.title,
    status: todo.status ? 'true' : 'false',
  };

  const onSubmitAction = updateTodo.bind(null, +todoId);

  return (
    <main className='p-8'>
      <div className='bg-white rounded-2xl p-8 flex flex-col gap-8'>
        <h1 className='text-2xl font-semibold'>Edit Todo</h1>
        <TodoForm
          defaultValues={defaultValues}
          onSubmitAction={onSubmitAction}
        />
      </div>
    </main>
  );
}

// function test(a, b) {
//   console.log(this);
//   console.log(a);
//   console.log(b);
// }

// const newTest = test.bind('hello', 'world', 'ahhh');
// // () => { console.log('hello'); console.log('world'); console.log('ahhh') }
