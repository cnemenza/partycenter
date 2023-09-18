'use client';

import Link from 'next/link';
import { FcContacts, FcFlowChart, FcHome, FcShipped, FcShop, FcSurvey } from 'react-icons/fc';
import PerfectScrollbar from 'react-perfect-scrollbar';

function MenuItems() {
  // const [currentMenu, setCurrentMenu] = useState('')
  // const [errorSubMenu, setErrorSubMenu] = useState(false)

  // const toggleMenu = (value) => {
  //   setCurrentMenu((oldValue) => {
  //     return oldValue === value ? '' : value
  //   })
  // }

  const maintenanceItems = [
    {
      icon: <FcFlowChart />,
      name: 'Categories',
      to: '/dashboard/categories'
    },
    {
      icon: <FcShop />,
      name: 'Products',
      to: '/dashboard/products'
    },

    {
      icon: <FcShipped />,
      name: 'Delivery Areas',
      to: '/dashboard/deliveries'
    }
  ];

  const coreItems = [
    {
      icon: <FcSurvey />,
      name: 'Orders',
      to: '/dashboard/orders'
    },
    {
      icon: <FcContacts />,
      name: 'Clients',
      to: '/dashboard/clients'
    }
  ];

  return (
    <PerfectScrollbar className='relative h-[calc(100vh-80px)]'>
      <ul className='relative space-y-0.5 p-4 py-0 font-semibold'>
        <li className='nav-item'>
          <Link href='/dashboard' className='group'>
            <div className='flex items-center'>
              <FcHome />
              <span className='text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark'>
                Home
              </span>
            </div>
          </Link>
        </li>

        <h2 className='-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]'>
          <span>Core</span>
        </h2>

        <li className='nav-item'>
          <ul>
            {coreItems.map((item, i) => {
              return (
                <li key={i} className='menu nav-item'>
                  <Link href={item.to} className='group'>
                    <div className='flex items-center'>
                      {item.icon}
                      <span className='text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark'>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>

        <h2 className='-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]'>
          <span>Maintenance</span>
        </h2>

        <li className='nav-item'>
          <ul>
            {maintenanceItems.map((item, i) => {
              return (
                <li key={i} className='menu nav-item'>
                  <Link href={item.to} className='group'>
                    <div className='flex items-center'>
                      {item.icon}
                      <span className='text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark'>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>

        {/* <li className='menu nav-item'>
        <button
          type='button'
          className={`${currentMenu === 'auth' ? 'active' : ''} nav-link group w-full`}
          onClick={() => toggleMenu('auth')}
        >
          <div className='flex items-center'>
            <svg
              className='group-hover:!text-primary shrink-0'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                opacity='0.5'
                d='M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z'
                fill='currentColor'
              />
              <path
                d='M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z'
                fill='currentColor'
              />
              <path
                d='M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z'
                fill='currentColor'
              />
              <path
                d='M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z'
                fill='currentColor'
              />
              <path
                d='M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C17.8174 10.0089 18.3135 10.022 18.75 10.0546V8C18.75 4.27208 15.7279 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z'
                fill='currentColor'
              />
            </svg>
            <span className='text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark'>
              {'authentication'}
            </span>
          </div>

          <div className={currentMenu === 'auth' ? 'rotate-90' : 'rtl:rotate-180'}>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9 5L15 12L9 19'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </button>

        <AnimateHeight duration={300} height={currentMenu === 'auth' ? 'auto' : 0}>
          <ul className='sub-menu text-gray-500'>
            <li>
              <Link href='/auth/boxed-signin' target='_blank'>
                {'login_boxed'}
              </Link>
            </li>
            <li>
              <Link href='/auth/boxed-signup' target='_blank'>
                {'register_boxed'}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li> */}
      </ul>
    </PerfectScrollbar>
  );
}

export default MenuItems;
