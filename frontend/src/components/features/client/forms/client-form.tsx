import { Form, FormActions } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { NotFoundResult } from '@/components/ui/result/not-found';
import { Client, createClient, getClient, updateClient } from '@/services/client.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSave } from 'react-icons/lu';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import * as z from 'zod';
import { ClientAddressInputs } from '../inputs/client-address-inputs';
import { ClientInformationInputs } from '../inputs/client-information-inputs';

interface ClientFormProps {
  editId?: string;
  onSuccess: () => void;
  notFoundReturnUrl?: string;
}

const clientAddresesValidationSchema = z.object({
  deliveryId: z.string().nonempty(),
  address: z.string().nonempty()
});

const clientValidationSchema = z.object({
  name: z.string().nonempty().max(80),
  lastName: z.string().nonempty().max(80),
  email: z.string().email(),
  phone: z.string().nonempty().max(200),
  secondaryPhone: z.string().max(200).optional(),
  clientAddresses: z.array(clientAddresesValidationSchema).optional()
});

const ClientForm = ({ editId, onSuccess, notFoundReturnUrl }: ClientFormProps) => {
  const formClientMutation = useMutation({
    mutationFn: async (data: Client) => {
      return !!editId ? updateClient(editId!, data) : createClient(data);
    },
    onSuccess: () => {
      const description = `Record ${!!editId ? 'edited' : 'created'} successfully.`;

      toast.success('Completed', {
        description: description
      });

      onSuccess();
    },
    onError: (error) => {
      toast.error('Error', {
        description: error as any
      });
    }
  });

  const getClientFn = async () => {
    return await getClient(editId!);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ['get-client', editId],
    queryFn: getClientFn,
    enabled: !!editId,
    onSuccess: (data) => {
      reset({ ...data });
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Client>({
    resolver: zodResolver(clientValidationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    await formClientMutation.mutateAsync(data);
  });

  return isError ? (
    <NotFoundResult title='Client not found!' text='The searched client does not exist ' href={notFoundReturnUrl} />
  ) : (
    <Form isFetching={isLoading} onSubmit={onSubmit}>
      <ClientInformationInputs errors={errors} register={register} />
      <ClientAddressInputs errors={errors} register={register} control={control} />
      <FormActions>
        <Button loading={formClientMutation.isLoading} type='submit' icon={<LuSave />}>
          Submit
        </Button>
      </FormActions>
    </Form>
  );
};

export { ClientForm };
