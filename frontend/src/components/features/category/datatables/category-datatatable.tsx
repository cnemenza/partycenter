import { ConfirmAlertDialog } from '@/components/ui/alert-dialog/confirm-alert-dialog';
import { ButtonIcon } from '@/components/ui/button';
import { DataTableHandle, DataTableServerSide } from '@/components/ui/data-table';
import { Category, deleteCategory, getCategoriesPagination } from '@/services/category.service';
import { ColumnDef } from '@tanstack/react-table';
import { RefObject, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface CategoryDatatableProps {
  refDataTable: RefObject<DataTableHandle>;
  onClickEdit: (id: string) => void;
}

const InitialStateAlertDeleteInfo = {
  show: false,
  id: '',
  title: '',
  text: ''
};

const CategoryDataTable = ({ refDataTable, onClickEdit }: CategoryDatatableProps) => {
  const handleDeleteCategory = useMutation(async (id: string) => await deleteCategory(id));

  const [alertDeleteInfo, setAlertDeleteInfo] = useState(InitialStateAlertDeleteInfo);

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: () => 'Description'
    },
    {
      accessorKey: 'options',
      header: () => 'Options',
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.name;

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
                  title: 'Delete Category',
                  text: `The category '${name}' will be permanently deleted. Are you sure?`,
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
        keyDatatable='category-datatable'
        columns={columns}
        service={getCategoriesPagination}
      />

      {alertDeleteInfo.show && (
        <ConfirmAlertDialog
          title={alertDeleteInfo.title}
          text={alertDeleteInfo.text}
          show={alertDeleteInfo.show}
          onCofirm={async () => {
            try {
              await handleDeleteCategory.mutateAsync(alertDeleteInfo.id);
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

export { CategoryDataTable };
