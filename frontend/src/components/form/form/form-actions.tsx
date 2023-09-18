import { cn } from '@/utils';

interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormActions = ({ className, ...props }: FormActionsProps) => {
  return <div {...props} className={cn('flex justify-end items-center mt-8 space-x-3', className)} />;
};

export { FormActions };
