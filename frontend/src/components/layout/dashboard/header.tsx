import { toggleSidebar } from '@/store/features/themeConfigSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AuthInfo from './auth-info';

function Header() {
  const pathName = usePathname();

  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathName]);

  const themeConfig = useAppSelector((state) => state.themeConfig);

  const dispatch = useAppDispatch();

  return (
    <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
      <div className='shadow-sm'>
        <div className='relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black'>
          <div className='horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden'>
            <Link href='/dashboard' className='main-logo flex shrink-0 items-center'>
              <Image
                width={80}
                height={80}
                priority={true}
                className='inline ltr:-ml-1 rtl:-mr-1'
                src='/assets/images/logo.png'
                alt='partycenter-logo'
              />
            </Link>
            <button
              type='button'
              className='collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden'
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M20 7L4 7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                <path opacity='0.5' d='M20 12L4 12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                <path d='M20 17L4 17' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
              </svg>
            </button>
          </div>

          <div className='flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2'>
            <div className='sm:ltr:mr-auto sm:rtl:ml-auto'></div>
            <AuthInfo />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
