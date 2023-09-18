import { ConfirmAlertDialog } from '@/components/ui/alert-dialog/confirm-alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ButtonIcon } from '@/components/ui/button';
import { DataTableHandle, DataTableServerSide } from '@/components/ui/data-table';
import { GeneralsConstants } from '@/constants';
import { Product, deleteProduct, getProductsPagination } from '@/services/product.service';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { RefObject, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface ProductDatatableProps {
  refDataTable: RefObject<DataTableHandle>;
}

const InitialStateAlertDeleteInfo = {
  show: false,
  id: '',
  title: '',
  text: ''
};

const ProductDataTable = ({ refDataTable }: ProductDatatableProps) => {
  const handleDeleteProduct = useMutation(async (id: string) => await deleteProduct(id));

  const [alertDeleteInfo, setAlertDeleteInfo] = useState(InitialStateAlertDeleteInfo);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'code',
      header: () => 'Code'
    },
    {
      accessorKey: 'name',
      header: () => 'Name'
    },
    {
      accessorKey: 'category.name',
      header: () => 'Category'
    },
    {
      accessorKey: 'price',
      header: () => 'Price',
      cell: ({ row }) => {
        return `${GeneralsConstants.CURRENCY}${row.original.price.toFixed(2)}`;
      }
    },
    {
      accessorKey: 'status',
      header: () => 'Status',
      cell: ({ row }) => {
        if (row.original.enabled) {
          return <Badge variant='success' text='Enabled' />;
        } else {
          return <Badge variant='dark' text='Disabled' />;
        }
      }
    },
    {
      accessorKey: 'options',
      header: () => 'Options',
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.name;

        return (
          <div className='space-x-2 flex'>
            <ButtonIcon type='button' title='Edit' asChild>
              <Link href={`/dashboard/products/${id}`}>
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
                  title: 'Delete Product',
                  text: `The product '${name}' will be permanently deleted. Are you sure?`,
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
        keyDatatable='product-datatable'
        columns={columns}
        service={getProductsPagination}
      />

      {alertDeleteInfo.show && (
        <ConfirmAlertDialog
          title={alertDeleteInfo.title}
          text={alertDeleteInfo.text}
          show={alertDeleteInfo.show}
          onCofirm={async () => {
            try {
              await handleDeleteProduct.mutateAsync(alertDeleteInfo.id);
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

export { ProductDataTable };
