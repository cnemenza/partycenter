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

interface EditProductPageProps {
  params: {
    id: string;
  };
}

const EditProductPage = ({ params }: EditProductPageProps) => {
  const router = useRouter();

  return (
    <Porlet
      breadcrums={[
        { name: 'Products', to: '/dashboard/products' },
        { name: 'Edit', to: '/dashboard/products/Edit' }
      ]}
    >
      <Porlet.Header title='Edit Product' />
      <Porlet.Body>
        <ProductForm
          editId={params.id}
          onSuccess={() => router.push('/dashboard/products')}
          notFoundReturnUrl='/dashboard/products'
        />
      </Porlet.Body>
    </Porlet>
  );
};

export default EditProductPage;
