'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function SearchTodo() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = new URLSearchParams(searchParams);

  const handleChangeSearch = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      search.set('q', searchTerm);
    } else {
      search.delete('q');
    }
    router.push(`${pathname}?${search}`);
  };

  return (
    <input
      type="text"
      className="border border-gray-200 outline-none flex-1 px-3 py-1.5 rounded-md"
      onChange={handleChangeSearch}
    />
  );
}
