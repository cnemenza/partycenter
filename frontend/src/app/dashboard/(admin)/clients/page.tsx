'use client';

import { DebounceInput } from '@/components/form/debounce-input';
import { Button } from '@/components/ui/button';
import { DataTableHandle } from '@/components/ui/data-table';
import { Porlet } from '@/components/ui/porlet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';

const ClientDataTable = dynamic(() =>
  import('@/components/features/client/datatables/client-datatable').then((mod) => mod.ClientDataTable)
);

function ClientPage() {
  const refClientDataTable = useRef<DataTableHandle>(null);
  const [clientDataTableParams, setClientDataTableParams] = useState({});

  useEffect(() => {
    refClientDataTable.current?.setParams(clientDataTableParams);
  }, [clientDataTableParams]);

  return (
    <Porlet breadcrums={[{ name: 'Client', to: '/dashboard/clients' }]}>
      <Porlet.Header title='Clients' />
      <Porlet.Actions>
        <DebounceInput
          onFinishTyping={(value: string) => setClientDataTableParams((prev) => ({ ...prev, search: value }))}
        />
        <div className='flex gap-2 justify-center mt-5 md:mt-0'>
          <Button asChild variant='primary'>
            <Link href='/dashboard/clients/add'>
              <IoAddSharp className='h-4.5 w-4.5' /> Add
            </Link>
          </Button>
        </div>
      </Porlet.Actions>
      <Porlet.Body>
        <ClientDataTable refDataTable={refClientDataTable} />
      </Porlet.Body>
    </Porlet>
  );
}

export default ClientPage;
