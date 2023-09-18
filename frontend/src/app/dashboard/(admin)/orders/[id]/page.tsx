'use client';

import { Porlet } from '@/components/ui/porlet';
import FormSkeleton from '@/components/ui/skeleton/form-skeleton';
import dynamic from 'next/dynamic';

const OrderForm = dynamic(() => import('@/components/features/order/forms/order-form').then((mod) => mod.OrderForm), {
  loading: () => <FormSkeleton />
});

interface EditOrderPageProps {
  params: {
    id: string;
  };
}

const EditProductPage = ({ params }: EditOrderPageProps) => {
  return (
    <Porlet
      breadcrums={[
        { name: 'Orders', to: '/dashboard/orders' },
        { name: 'Edit', to: '/dashboard/orders/edit' }
      ]}
    >
      <Porlet.Header title='Edit Order' />
      <Porlet.Body>
        <OrderForm editId={params.id} />
      </Porlet.Body>
    </Porlet>
  );
};

export default EditProductPage;
