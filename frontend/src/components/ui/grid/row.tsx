import { cn } from '@/utils';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {}

const Row = ({ className, ...props }: RowProps) => {
  return <div {...props} className={cn('grid grid-cols-1 gap-4', className)} />;
};

export { Row };
