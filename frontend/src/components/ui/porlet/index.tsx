import { cn } from '@/utils';
import { Breadcrumbs } from '../breadcrumbs';

interface PorletProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  breadcrums?: {
    to: string;
    name: string;
  }[];
}

const Porlet = ({ className, breadcrums, ...props }: PorletProps) => {
  return (
    <>
      {breadcrums ? <Breadcrumbs routes={breadcrums} /> : null}
      <div {...props} className={cn(`panel space-y-4`, className)} />
    </>
  );
};

interface PorletHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
}

const PortletHeader = ({ title }: PorletHeaderProps) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg font-bold dark:text-white-light'>{title}</h5>
      </div>
    </>
  );
};

const PorletBody = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

interface PorletActionsProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const PorletActions = ({ children, className }: PorletActionsProps) => {
  return <div className={cn('md:flex md:justify-between', className)}>{children}</div>;
};

Porlet.Header = PortletHeader;
Porlet.Actions = PorletActions;
Porlet.Body = PorletBody;

export { Porlet };
