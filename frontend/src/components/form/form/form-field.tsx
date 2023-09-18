import { cn } from '@/utils';
import { FieldError } from 'react-hook-form';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: FieldError;
}

const FormField = ({ error, className, children, ...props }: FormFieldProps) => {
  return (
    <div {...props} className={cn(className, error && 'has-error')}>
      {children}
      {error && <div className='text-danger mt-1'>{error.message}</div>}
    </div>
  );
};

export { FormField };
