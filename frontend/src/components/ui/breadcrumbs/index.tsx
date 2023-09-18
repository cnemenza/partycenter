import Link from 'next/link';
import { IoHome } from 'react-icons/io5';

interface BreadcrumbsProps {
  routes: {
    to: string;
    name: string;
  }[];
}

const Breadcrumbs = ({ routes }: BreadcrumbsProps) => {
  return (
    <div className='mb-5'>
      <ol className='flex font-semibold text-gray-500 dark:text-white-dark'>
        <li>
          <Link href='/dashboard' className='hover:text-gray-500/70 dark:hover:text-white-dark/70'>
            <IoHome className='h-4 w-4' />
          </Link>
        </li>

        {routes.map((item, index) => {
          return (
            <li key={index} className="before:px-1.5 before:content-['/']">
              <Link href={item.to}>{item.name}</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export { Breadcrumbs };
