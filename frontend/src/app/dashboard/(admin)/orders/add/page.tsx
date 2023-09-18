'use client';

import { Porlet } from '@/components/ui/porlet';
import FormSkeleton from '@/components/ui/skeleton/form-skeleton';
import dynamic from 'next/dynamic';

const OrderForm = dynamic(() => import('@/components/features/order/forms/order-form').then((mod) => mod.OrderForm), {
  loading: () => <FormSkeleton />
});

function AddOrderPage() {
  return (
    <Porlet
      breadcrums={[
        { name: 'Orders', to: '/dashboard/orders' },
        { name: 'Add', to: '/dashboard/orders/add' }
      ]}
    >
      <Porlet.Header title='Add Order' />
      <Porlet.Body>
        <OrderForm />
      </Porlet.Body>
    </Porlet>
  );
}

export default AddOrderPage;
