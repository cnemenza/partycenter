import { cn } from '@/utils';

interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element;
  text: string;
}

const FormHeader = ({ icon, text, children, className }: FormHeaderProps) => {
  return (
    <div className={cn('flex justify-between', className)}>
      <div className='flex items-end'>
        {icon}
        <h4 className='ml-2 font-bold text-primary'>{text}</h4>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export { FormHeader };
