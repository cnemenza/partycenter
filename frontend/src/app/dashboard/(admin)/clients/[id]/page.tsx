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

interface EditClientPageProps {
  params: {
    id: string;
  };
}

const EditClientPage = ({ params }: EditClientPageProps) => {
  const router = useRouter();

  return (
    <Porlet
      breadcrums={[
        { name: 'Clients', to: '/dashboard/clients' },
        { name: 'Edit', to: '/dashboard/clients/Edit' }
      ]}
    >
      <Porlet.Header title='Edit Client' />
      <Porlet.Body>
        <ClientForm
          editId={params.id}
          onSuccess={() => router.push('/dashboard/clients')}
          notFoundReturnUrl='/dashboard/clients'
        />
      </Porlet.Body>
    </Porlet>
  );
};

export default EditClientPage;
