import { cn } from '@/utils';
import React from 'react';

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <div>
        <div className='flex'>
          <div
            className={cn(
              'flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 dark:border-[#17263c] dark:bg-[#1b2e4b]',
              className
            )}
          >
            {label}
            {children}
          </div>
          <input
            ref={ref}
            {...props}
            className='form-input ltr:rounded-l-none rtl:rounded-r-none read-only:bg-gray-100 read-only:pointer-events-none'
          />
        </div>
      </div>
    );
  }
);

export { InputLabel };
