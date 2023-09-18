import { ConfirmAlertDialog } from '@/components/ui/alert-dialog/confirm-alert-dialog';
import { ButtonIcon } from '@/components/ui/button';
import { DataTableHandle, DataTableServerSide } from '@/components/ui/data-table';
import { Client, deleteClient, getClientsPagination } from '@/services/client.service';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { RefObject, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface ClientDatatableProps {
  refDataTable: RefObject<DataTableHandle>;
}

const InitialStateAlertDeleteInfo = {
  show: false,
  id: '',
  title: '',
  text: ''
};

const ClientDataTable = ({ refDataTable }: ClientDatatableProps) => {
  const handleDeleteClient = useMutation(async (id: string) => await deleteClient(id));

  const [alertDeleteInfo, setAlertDeleteInfo] = useState(InitialStateAlertDeleteInfo);

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'fullName',
      header: () => 'Full Name'
    },
    {
      accessorKey: 'email',
      header: () => 'Email'
    },
    {
      accessorKey: 'phone',
      header: () => 'Phone'
    },
    {
      accessorKey: 'options',
      header: () => 'Options',
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.fullName;

        return (
          <div className='space-x-2 flex'>
            <ButtonIcon type='button' title='Edit' asChild>
              <Link href={`/dashboard/clients/${id}`}>
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
                  title: 'Delete Client',
                  text: `The client '${name}' will be permanently deleted. Are you sure?`,
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
        keyDatatable='client-datatable'
        columns={columns}
        service={getClientsPagination}
      />

      {alertDeleteInfo.show && (
        <ConfirmAlertDialog
          title={alertDeleteInfo.title}
          text={alertDeleteInfo.text}
          show={alertDeleteInfo.show}
          onCofirm={async () => {
            try {
              await handleDeleteClient.mutateAsync(alertDeleteInfo.id);
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

export { ClientDataTable };
