'use client';

import { cn } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from '../button';

interface ConfirmAlertDialogProps {
  title: string;
  text: React.ReactNode;
  show: boolean;
  onCofirm: () => Promise<any>;
  close: () => any;
}

function ConfirmAlertDialog({ title, text, onCofirm, show, close }: ConfirmAlertDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onCofirm();
    setLoading(false);
  };

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
                <p className='text-sm text-center'>{text}</p>
                <div className='flex gap-4 md:flex-row flex-col-reverse'>
                  <Button
                    disabled={loading}
                    type='button'
                    variant='dark'
                    className='md:w-1/2 w-full'
                    onClick={() => close()}
                  >
                    Cancel
                  </Button>

                  <Button
                    loading={loading}
                    type='button'
                    variant='primary'
                    className='md:w-1/2 w-full'
                    onClick={() => handleConfirm()}
                  >
                    {loading ? 'Please wait...' : 'Confirm'}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export { ConfirmAlertDialog };
