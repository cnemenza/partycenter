'use client';

import { DebounceInput } from '@/components/form/debounce-input';
import { Button } from '@/components/ui/button';
import { DataTableHandle } from '@/components/ui/data-table';
import { Porlet } from '@/components/ui/porlet';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';

const CategoryDatatable = dynamic(() =>
  import('@/components/features/category/datatables/category-datatatable').then((mod) => mod.CategoryDataTable)
);

const CategoryModal = dynamic(() =>
  import('@/components/features/category/modals/category-modal').then((mod) => mod.CategoryModal)
);

interface IDataModal {
  show: boolean;
  editId: string | null;
  title: string;
}

function CategoryPage() {
  const refCategoriesDatatable = useRef<DataTableHandle>(null);
  const [categoriesDataTableParams, setCategoriesDataTableParams] = useState({});

  const [dataModal, setDataModal] = useState<IDataModal>({
    show: false,
    editId: null,
    title: ''
  });

  useEffect(() => {
    refCategoriesDatatable.current?.setParams(categoriesDataTableParams);
  }, [categoriesDataTableParams]);

  return (
    <Porlet breadcrums={[{ name: 'Categories', to: '/dashboard/categories' }]}>
      <Porlet.Header title='Categories' />
      <Porlet.Actions className=''>
        <DebounceInput
          onFinishTyping={(value: string) => setCategoriesDataTableParams((prev) => ({ ...prev, search: value }))}
        />
        <div className='flex gap-2 justify-center mt-5 md:mt-0'>
          <Button
            type='button'
            variant='primary'
            onClick={() => setDataModal({ show: true, editId: null, title: 'Add Category' })}
            icon={<IoAddSharp className='h-4.5 w-4.5' />}
          >
            Add
          </Button>
        </div>
      </Porlet.Actions>
      <Porlet.Body>
        <CategoryDatatable
          refDataTable={refCategoriesDatatable}
          onClickEdit={(id) => setDataModal({ show: true, editId: id, title: 'Edit Category' })}
        />
      </Porlet.Body>

      <CategoryModal
        title={dataModal.title}
        editId={dataModal.editId}
        show={dataModal.show}
        handleClose={() =>
          setDataModal({
            ...dataModal,
            show: false
          })
        }
        onSuccess={() => refCategoriesDatatable.current?.reload()}
      />
    </Porlet>
  );
}

export default CategoryPage;
