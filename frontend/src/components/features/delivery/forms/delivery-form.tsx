'use client';

import { Form, FormActions, FormField } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { Row } from '@/components/ui/grid';
import { Delivery, createDelivery, getDelivery, updateDelivery } from '@/services/delivery.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSave } from 'react-icons/lu';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import * as z from 'zod';

interface DeliveryFormProps {
  handleClose: () => void;
  editId: string | null;
  onSuccess: () => void;
}

const validationSchema = z.object({
  description: z.string().nonempty().max(100),
  price: z.number().nonnegative()
});

const DeliveryForm = ({ onSuccess, handleClose, editId }: DeliveryFormProps) => {
  const formDeliveryMutation = useMutation({
    mutationFn: async (data: Delivery) => {
      return !!editId ? updateDelivery(editId!, data) : createDelivery(data);
    },
    onSuccess: () => {
      const description = `Record ${!!editId ? 'edited' : 'created'} successfully.`;

      toast.success('Completed', {
        description: description
      });

      onSuccess();
      handleClose();
    },
    onError: (error) => {
      toast.error('Error', {
        description: error as any
      });
    }
  });

  const getDeliveryFn = async () => {
    return await getDelivery(editId!);
  };

  const { isLoading } = useQuery({
    queryKey: ['get-delivery', editId],
    queryFn: getDeliveryFn,
    enabled: !!editId,
    onSuccess: (data) => {
      reset({ ...data });
    },
    onError: (error) => {
      handleClose();
      toast.error('Error', {
        description: error as any
      });
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Delivery>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    await formDeliveryMutation.mutateAsync(data);
  });

  return (
    <Form isFetching={isLoading} onSubmit={onSubmit}>
      <Row>
        <FormField error={errors?.description}>
          <Input {...register('description')} label='Description' type='text' placeholder='Enter description' />
        </FormField>
      </Row>
      <Row>
        <FormField error={errors?.price}>
          <Input
            {...register('price', { valueAsNumber: true })}
            label='Price'
            type='number'
            placeholder='Enter price'
          />
        </FormField>
      </Row>

      <FormActions>
        <Button disabled={formDeliveryMutation.isLoading} type='button' variant='dark' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button loading={formDeliveryMutation.isLoading} type='submit' icon={<LuSave />}>
          Submit
        </Button>
      </FormActions>
    </Form>
  );
};

export { DeliveryForm };
