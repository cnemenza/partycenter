'use client';

import { DatePicker } from '@/components/form/datepicker';
import { DebounceInput } from '@/components/form/debounce-input';
import { Button } from '@/components/ui/button';
import { DataTableHandle } from '@/components/ui/data-table';
import { Row } from '@/components/ui/grid';
import { Porlet } from '@/components/ui/porlet';
import { OrderDataTableParamsValues } from '@/services/order.service';
import { dateToString } from '@/utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';

const OrderDataTable = dynamic(() =>
  import('@/components/features/order/datatables/order-datatable').then((mod) => mod.OrderDataTable)
);

const OrderPage = () => {
  const refOrderDataTable = useRef<DataTableHandle>(null);
  const [orderDataTableParams, setOrderDataTableParams] = useState<OrderDataTableParamsValues>({});

  useEffect(() => {
    refOrderDataTable.current?.setParams(orderDataTableParams);
  }, [orderDataTableParams]);

  return (
    <Porlet breadcrums={[{ name: 'Orders', to: '/dashboard/orders' }]}>
      <Porlet.Header title='Orders' />
      <Porlet.Actions>
        <Row className='gap-3 grid items-center w-full sm:w-auto sm:flex'>
          <div className='w-full'>
            <DebounceInput
              onFinishTyping={(value: string) => setOrderDataTableParams((prev) => ({ ...prev, search: value }))}
            />
          </div>

          <DatePicker
            isClearable
            placeholder='Search by date'
            onChange={(value: Date) => {
              setOrderDataTableParams((prev) => ({ ...prev, dateStr: value ? dateToString(value) : undefined }));
            }}
          />
        </Row>

        <div className='flex gap-2 justify-center mt-5 md:mt-0'>
          <Button asChild variant='primary'>
            <Link href='/dashboard/orders/add'>
              <IoAddSharp className='h-4.5 w-4.5' /> Add
            </Link>
          </Button>
        </div>
      </Porlet.Actions>
      <Porlet.Body>
        <OrderDataTable refDataTable={refOrderDataTable} />
      </Porlet.Body>
    </Porlet>
  );
};

export default OrderPage;
