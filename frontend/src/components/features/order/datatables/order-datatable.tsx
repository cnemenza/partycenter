import { ConfirmAlertDialog } from '@/components/ui/alert-dialog/confirm-alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ButtonIcon } from '@/components/ui/button';
import { DataTableHandle, DataTableServerSide } from '@/components/ui/data-table';
import { GeneralsConstants, OrderConstants } from '@/constants';
import { Order, deleteOrder, getOrdersPagination } from '@/services/order.service';
import { dateToString, dateToStringDetailed } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { RefObject, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface OrderDatatableProps {
  refDataTable: RefObject<DataTableHandle>;
}

const InitialStateAlertDeleteInfo = {
  show: false,
  id: '',
  title: '',
  text: ''
};

const OrderDataTable = ({ refDataTable }: OrderDatatableProps) => {
  const handleDeleteOrder = useMutation(async (id: string) => await deleteOrder(id));

  const [alertDeleteInfo, setAlertDeleteInfo] = useState(InitialStateAlertDeleteInfo);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'code',
      header: () => 'Code'
    },
    {
      header: () => 'Created At',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        return dateToStringDetailed(new Date(row.original.createdAt!));
      }
    },
    {
      header: () => 'Event Date',
      accessorKey: 'eventDate',
      cell: ({ row }) => {
        return dateToString(new Date(row.original.eventDate));
      }
    },
    {
      accessorKey: 'client',
      header: () => 'Client',
      cell: ({ row }) => {
        return row.original.client.fullName;
      }
    },
    {
      accessorKey: 'type',
      header: () => 'Type',
      cell: ({ row }) => {
        switch (row.original.type) {
          case OrderConstants.OrderTypes.VALUES.INTERNAL:
            return <Badge text={OrderConstants.OrderTypes.VALUES.INTERNAL} variant='primary' />;
          case OrderConstants.OrderTypes.VALUES.WEB:
            return <Badge text={OrderConstants.OrderTypes.VALUES.WEB} variant='dark' />;
        }
      }
    },
    {
      accessorKey: 'total',
      header: () => 'Total',
      cell: ({ row }) => {
        return `${GeneralsConstants.CURRENCY}${row.original.total.toFixed(2)}`;
      }
    },
    {
      accessorKey: 'options',
      header: () => 'Options',
      cell: ({ row }) => {
        const id = row.original.id;
        const code = row.original.code;

        return (
          <div className='space-x-2 flex'>
            <ButtonIcon type='button' title='Edit' asChild>
              <Link href={`/dashboard/orders/${id}`}>
                <FiEdit className='w-4.5 h-4.5 text-primary' />
              </Link>
            </ButtonIcon>

            <ButtonIcon
              type='button'
              title='Delete'
              asChild
              onClick={() =>
                setAlertDeleteInfo({
                  id: id,
                  title: 'Delete Order',
                  text: `The order '${name}' will be permanently deleted. Are you sure?`,
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
        keyDatatable='order-datatable'
        columns={columns}
        service={getOrdersPagination}
      />

      {alertDeleteInfo.show && (
        <ConfirmAlertDialog
          title={alertDeleteInfo.title}
          text={alertDeleteInfo.text}
          show={alertDeleteInfo.show}
          onCofirm={async () => {
            try {
              await handleDeleteOrder.mutateAsync(alertDeleteInfo.id);
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

export { OrderDataTable };
