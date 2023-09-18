import { Form, FormActions, FormField } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { Row } from '@/components/ui/grid';
import { Category, createCategory, getCategory, updateCategory } from '@/services/category.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSave } from 'react-icons/lu';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import * as z from 'zod';

interface CategoryFormProps {
  handleClose: () => void;
  editId: string | null;
  onSuccess: () => void;
}

const validationSchema = z.object({
  name: z.string().nonempty().max(80)
});

const CategoryForm = ({ onSuccess, handleClose, editId }: CategoryFormProps) => {
  const formCategoryMutation = useMutation({
    mutationFn: async (data: Category) => {
      return !!editId ? updateCategory(editId!, data) : createCategory(data);
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

  const getCategoryFn = async () => {
    return await getCategory(editId!);
  };

  const { isLoading } = useQuery({
    queryKey: ['get-category', editId],
    queryFn: getCategoryFn,
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
  } = useForm<Category>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    return await formCategoryMutation.mutateAsync(data);
  });

  return (
    <Form isFetching={isLoading} onSubmit={onSubmit}>
      <Row>
        <FormField error={errors?.name}>
          <Input {...register('name')} label='Description' type='text' placeholder='Enter name' />
        </FormField>
      </Row>

      <FormActions>
        <Button disabled={formCategoryMutation.isLoading} type='button' variant='dark' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button loading={formCategoryMutation.isLoading} type='submit' icon={<LuSave />}>
          Submit
        </Button>
      </FormActions>
    </Form>
  );
};

export { CategoryForm };
