import { Loader } from '@/components/ui/loader';
import { cn } from '@/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isFetching: boolean;
}

const Form = ({ className, isFetching, children, ...props }: FormProps) => {
  return (
    <form autoComplete='off' noValidate className={cn(isFetching && 'relative')} {...props}>
      {isFetching && <Loader text='Please wait a few seconds.' />}
      <div className={cn('space-y-4.5', isFetching && 'blur-sm')}>{children}</div>
    </form>
  );
};

export { Form };
