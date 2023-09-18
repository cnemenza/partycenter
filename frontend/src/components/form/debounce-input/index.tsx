'use client';

import { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface DebounceInputProps {
  onFinishTyping: Function;
}

function DebounceInput({ onFinishTyping }: DebounceInputProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const firstUpdate = useRef(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      } else {
        onFinishTyping(searchTerm);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className='group relative'>
      <input
        autoComplete='off'
        type='text'
        className='peer form-input ltr:!pr-10 rtl:!pl-10 md:min-w-[15rem]'
        placeholder='Search...'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]'>
        <IoSearch />
      </div>
    </div>
  );
}

export { DebounceInput };
