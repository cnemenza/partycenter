'use client';

import { DebounceInput } from '@/components/form/debounce-input';
import { Button } from '@/components/ui/button';
import { DataTableHandle } from '@/components/ui/data-table';
import { Porlet } from '@/components/ui/porlet';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';

const ProductDataTable = dynamic(() =>
  import('@/components/features/product/datatables/product-datatable').then((mod) => mod.ProductDataTable)
);

function ProductPage() {
  const refProductDataTable = useRef<DataTableHandle>(null);
  const [productDataTableParams, setProductDataTableParams] = useState({});

  useEffect(() => {
    refProductDataTable.current?.setParams(productDataTableParams);
  }, [productDataTableParams]);

  return (
    <Porlet breadcrums={[{ name: 'Products', to: '/dashboard/products' }]}>
      <Porlet.Header title='Products' />
      <Porlet.Actions>
        <DebounceInput
          onFinishTyping={(value: string) => setProductDataTableParams((prev) => ({ ...prev, search: value }))}
        />
        <div className='flex gap-2 justify-center mt-5 md:mt-0'>
          <Button asChild variant='primary'>
            <Link href='/dashboard/products/add'>
              <IoAddSharp className='h-4.5 w-4.5' /> Add
            </Link>
          </Button>
        </div>
      </Porlet.Actions>
      <Porlet.Body>
        <ProductDataTable refDataTable={refProductDataTable} />
      </Porlet.Body>
    </Porlet>
  );
}

export default ProductPage;
