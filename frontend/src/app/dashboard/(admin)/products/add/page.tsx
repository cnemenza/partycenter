'use client';

import { Porlet } from '@/components/ui/porlet';
import FormSkeleton from '@/components/ui/skeleton/form-skeleton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ProductForm = dynamic(
  () => import('@/components/features/product/forms/product-form').then((mod) => mod.ProductForm),
  {
    loading: () => <FormSkeleton />
  }
);

function AddProductPage() {
  const router = useRouter();

  return (
    <Porlet
      breadcrums={[
        { name: 'Products', to: '/dashboard/products' },
        { name: 'Add', to: '/dashboard/products/add' }
      ]}
    >
      <Porlet.Header title='Add Product' />
      <Porlet.Body>
        <ProductForm onSuccess={() => router.push('/dashboard/products')} />
      </Porlet.Body>
    </Porlet>
  );
}

export default AddProductPage;
