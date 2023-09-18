'use client';

import { cn } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface AlertDialogProps {
  title: string;
  body: React.ReactNode;
  show: boolean;
  buttons: React.ReactNode;
}

const AlertDialog = ({ show, title, body, buttons }: AlertDialogProps) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as='div'
        className={cn('fixed inset-0 z-50 flex items-center justify-center overflow-y-auto', {
          'bg-[#000000]/70': show === true
        })}
        onClose={() => {}}
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
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Panel className='border-primary border-t-8 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4'>
                <Dialog.Title as='h3' className='text-lg font-bold text-primary text-center'>
                  {title}
                </Dialog.Title>
                <div className='text-sm text-center'>{body}</div>
                <div>{buttons}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { AlertDialog };
