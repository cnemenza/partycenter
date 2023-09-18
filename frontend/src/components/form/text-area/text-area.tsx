import { cn } from '@/utils';
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, className, ...props }, ref) => {
  return (
    <>
      {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
      <textarea {...props} ref={ref} className={cn('form-textarea', className)} />
    </>
  );
});

export { TextArea };
