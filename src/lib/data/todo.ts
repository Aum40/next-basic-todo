import prisma from '@/lib/db/prisma';

type QueryOption = {
  searchTerm?: string;
};

export function fetchTodo(option: QueryOption = {}) {
  return prisma.todo.findMany({
    where: {
      title: {
        contains: option.searchTerm,
        mode: 'insensitive'
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}

export async function countTodoByStatus() {
  const count = await prisma.todo.groupBy({
    by: 'status',
    _count: true
  });
  console.log(count);

  const result = count.reduce(
    (acc, el) => {
      if (el.status) {
        acc.completed = el._count;
      } else {
        acc.pending = el._count;
      }
      return acc;
    },
    { completed: 0, pending: 0 }
  );

  return result;
}
