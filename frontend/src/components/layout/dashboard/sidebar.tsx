import { toggleSidebar } from '@/store/features/themeConfigSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import MenuItems from './menu-items';

function Sidebar() {
  const pathName = usePathname();
  const themeConfig = useAppSelector((state) => state.themeConfig);
  const semidark = themeConfig.semidark;

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathName]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    selector?.classList.add('active');
  };

  const dispatch = useAppDispatch();

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? 'text-white-dark' : ''
        }`}
      >
        <div className='h-full bg-white dark:bg-black'>
          <div className='flex items-center justify-between px-4 py-3'>
            <Link href='/dashboard' className='main-logo flex shrink-0 items-center'>
              <Image
                width={130}
                height={130}
                priority={true}
                className='ml-[5px] flex-none'
                src='/assets/images/logo-blanco.png'
                alt='partycenter-logo'
              />
            </Link>

            <button
              type='button'
              className='collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10'
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='m-auto h-5 w-5'
              >
                <path
                  d='M13 19L7 12L13 5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  opacity='0.5'
                  d='M16.9998 19L10.9998 12L16.9998 5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <MenuItems />
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
