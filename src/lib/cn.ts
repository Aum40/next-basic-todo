import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// cn('p-4', 'w-full', 'text-xs', 'p-6')
// clsx(['p-4', 'w-full', 'text-xs', 'p-6']) // 'p-4 w-full text-xs p-6'
// twMerge('p-4 w-full text-xs p-6') // 'w-full text-xs p-6'

// clsx, twMerge
// 'a', 'b', 'c' ==> 'a b c'
// clsx('a', 'b', 'c') ==> 'a b c'
// clsx('p-8', 'text-xs', 'flex') ==> 'p-8 text-xs flex'
// clsx(status ? 'bg-blue-500': 'bg-gray-500', 'text-white text-xs px-2 py-1 rounded-lg')
// clsx({ 'bg-blue-500': status }) ==> ''

// clsx('p-8', 'p-4') ==> 'p-8 p-4'
// twMerge('p-8 p-4 text-xs') ==> 'p-4 text-xs'
