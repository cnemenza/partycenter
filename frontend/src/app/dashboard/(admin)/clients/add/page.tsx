'use client';

import { Porlet } from '@/components/ui/porlet';
import FormSkeleton from '@/components/ui/skeleton/form-skeleton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ClientForm = dynamic(
  () => import('@/components/features/client/forms/client-form').then((mod) => mod.ClientForm),
  {
    loading: () => <FormSkeleton />
  }
);

const AddClientPage = () => {
  const router = useRouter();

  return (
    <Porlet
      breadcrums={[
        { name: 'Clients', to: '/dashboard/clients' },
        { name: 'Add', to: '/dashboard/clients/add' }
      ]}
    >
      <Porlet.Header title='Add Client' />
      <Porlet.Body>
        <ClientForm onSuccess={() => router.push('/dashboard/clients')} />
      </Porlet.Body>
    </Porlet>
  );
};

export default AddClientPage;
