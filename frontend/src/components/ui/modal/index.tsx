import { Dialog, Transition } from '@headlessui/react';
import { VariantProps, cva } from 'class-variance-authority';
import React, { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';
import { ButtonIcon } from '../button';

const modalVariants = cva('flex items-center p-3.5 rounded', {
  variants: {
    variant: {
      lg: 'text-white bg-primary',
      sm: 'text-white bg-danger',
      xl: 'text-white bg-warning',
      default: 'text-white bg-info'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
  title?: string;
  show: boolean;
  handleClose: () => void;
  isStatic: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ title, show, handleClose, isStatic = false, children }, ref) => {
    return (
      <Transition appear show={show} as={Fragment}>
        <Dialog
          ref={ref}
          as='div'
          open={show}
          onClose={() => {
            isStatic ? null : handleClose();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0' />
          </Transition.Child>
          <div className='fixed inset-0 bg-[black]/75 z-[999] overflow-y-auto'>
            <div className='flex items-start justify-center min-h-screen px-4'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark'>
                  <div className='flex bg-[#f6f7fa] dark:bg-[#121c2c] items-center justify-between px-5 py-3'>
                    <div className='font-bold text-lg'>{title}</div>
                    <ButtonIcon
                      onClick={() => handleClose()}
                      type='button'
                      asChild
                      className='text-white-dark hover:text-dark'
                    >
                      <IoClose className='w-5 h-5' />
                    </ButtonIcon>
                  </div>
                  <div className='p-5 text-sm'>{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

export { Modal };
