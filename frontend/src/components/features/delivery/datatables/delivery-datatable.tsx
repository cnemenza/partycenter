import { ConfirmAlertDialog } from '@/components/ui/alert-dialog/confirm-alert-dialog';
import { ButtonIcon } from '@/components/ui/button';
import { DataTableHandle, DataTableServerSide } from '@/components/ui/data-table';
import { GeneralsConstants } from '@/constants';
import { Delivery, deleteDelivery, getDeliveriesPagination } from '@/services/delivery.service';
import { ColumnDef } from '@tanstack/react-table';
import { RefObject, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface DeliveryDatatableProps {
  refDataTable: RefObject<DataTableHandle>;
  onClickEdit: (id: string) => void;
}

const InitialStateAlertDeleteInfo = {
  show: false,
  id: '',
  title: '',
  text: ''
};

const DeliveryDataTable = ({ refDataTable, onClickEdit }: DeliveryDatatableProps) => {
  const handleDeleteDelivery = useMutation(async (id: string) => await deleteDelivery(id));

  const [alertDeleteInfo, setAlertDeleteInfo] = useState(InitialStateAlertDeleteInfo);

  const columns: ColumnDef<Delivery>[] = [
    {
      accessorKey: 'description',
      header: () => 'Description'
    },
    {
      accessorKey: 'price',
      header: () => 'Price',
      cell: ({ row }) => {
        return `${GeneralsConstants.CURRENCY}${row.original.price.toFixed(2)}`;
      }
    },
    {
      accessorKey: 'options',
      header: () => 'Options',
      cell: ({ row }) => {
        const id = row.original.id;
        const description = row.original.description;

        return (
          <div className='space-x-2 flex'>
            <ButtonIcon type='button' title='Edit' asChild onClick={() => onClickEdit(id)}>
              <FiEdit className='w-4.5 h-4.5 text-primary' />
            </ButtonIcon>

            <ButtonIcon
              type='button'
              title='Delete'
              asChild
              onClick={() =>
                setAlertDeleteInfo({
                  id: id,
                  title: 'Delete Delivery',
                  text: `The delivery zone '${description}' will be permanently deleted. Are you sure?`,
                  show: true
                })
              }
            >
              <FiTrash2 className='w-4.5 h-4.5 text-danger' />
            </ButtonIcon>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <DataTableServerSide
        ref={refDataTable}
        keyDatatable='delivery-datatable'
        columns={columns}
        service={getDeliveriesPagination}
      />

      {alertDeleteInfo.show && (
        <ConfirmAlertDialog
          title={alertDeleteInfo.title}
          text={alertDeleteInfo.text}
          show={alertDeleteInfo.show}
          onCofirm={async () => {
            try {
              await handleDeleteDelivery.mutateAsync(alertDeleteInfo.id);
              refDataTable.current?.reload();
              setAlertDeleteInfo(InitialStateAlertDeleteInfo);
              toast.success('Completed!', {
                description: 'Record deleted successfully.'
              });
            } catch (error) {
              toast.error('Error', {
                description: error as any
              });
            } finally {
            }
          }}
          close={() => setAlertDeleteInfo(InitialStateAlertDeleteInfo)}
        />
      )}
    </>
  );
};

export { DeliveryDataTable };
