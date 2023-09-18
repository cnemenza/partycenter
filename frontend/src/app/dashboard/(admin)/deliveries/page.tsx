'use client';

import { DebounceInput } from '@/components/form/debounce-input';
import { Button } from '@/components/ui/button';
import { DataTableHandle } from '@/components/ui/data-table';
import { Porlet } from '@/components/ui/porlet';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';

const DeliveryDataTable = dynamic(() =>
  import('@/components/features/delivery/datatables/delivery-datatable').then((mod) => mod.DeliveryDataTable)
);

const DeliveryModal = dynamic(() =>
  import('@/components/features/delivery/modals/delivery-modal').then((mod) => mod.DeliveryModal)
);

interface IDataModal {
  show: boolean;
  editId: string | null;
  title: string;
}

function DeliveryPage() {
  const refDeliveriesDataTable = useRef<DataTableHandle>(null);
  const [deliveriesDataTableParams, setDeliveriesDataTableParams] = useState({});

  const [dataModal, setDataModal] = useState<IDataModal>({
    show: false,
    editId: null,
    title: ''
  });

  useEffect(() => {
    refDeliveriesDataTable.current?.setParams(deliveriesDataTableParams);
  }, [deliveriesDataTableParams]);

  return (
    <Porlet breadcrums={[{ name: 'Delivery Areas', to: '/dashboard/deliveries' }]}>
      <Porlet.Header title='Deliveries Areas' />
      <Porlet.Actions>
        <DebounceInput
          onFinishTyping={(value: string) => setDeliveriesDataTableParams((prev) => ({ ...prev, search: value }))}
        />
        <div className='flex gap-2 justify-center mt-5 md:mt-0'>
          <Button
            type='button'
            variant='primary'
            onClick={() => setDataModal({ show: true, editId: null, title: 'Add Delivery' })}
            icon={<IoAddSharp className='h-4.5 w-4.5' />}
          >
            Add
          </Button>
        </div>
      </Porlet.Actions>
      <Porlet.Body>
        <DeliveryDataTable
          refDataTable={refDeliveriesDataTable}
          onClickEdit={(id) => setDataModal({ show: true, editId: id, title: 'Edit Delivery' })}
        />
      </Porlet.Body>

      <DeliveryModal
        title={dataModal.title}
        editId={dataModal.editId}
        show={dataModal.show}
        handleClose={() =>
          setDataModal({
            ...dataModal,
            show: false
          })
        }
        onSuccess={() => refDeliveriesDataTable.current?.reload()}
      />
    </Porlet>
  );
}

export default DeliveryPage;
