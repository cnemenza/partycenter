import { Form, FormActions } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { NotFoundResult } from '@/components/ui/result/not-found';
import { ProductConstants } from '@/constants';
import { Product, createProduct, getProduct, updateProduct } from '@/services/product.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSave } from 'react-icons/lu';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import * as z from 'zod';
import { ProductGeneralInputs } from '../inputs/product-general-inputs';

interface ProductFormProps {
  editId?: string;
  onSuccess: () => void;
  notFoundReturnUrl?: string;
}

const validationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  type: z.nativeEnum(ProductConstants.ProductTypes.VALUES),
  categoryId: z.string().nonempty(),
  enabled: z.boolean()
});

const ProductForm = ({ editId, onSuccess, notFoundReturnUrl }: ProductFormProps) => {
  const formProductMutation = useMutation({
    mutationFn: async (data: Product) => {
      return !!editId ? updateProduct(editId!, data) : createProduct(data);
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

  const getProductFn = async () => {
    return await getProduct(editId!);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ['get-product', editId],
    queryFn: getProductFn,
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
  } = useForm<Product>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    await formProductMutation.mutateAsync(data);
  });

  return isError ? (
    <NotFoundResult title='Product not found!' text='The searched product does not exist ' href={notFoundReturnUrl} />
  ) : (
    <Form isFetching={isLoading} onSubmit={onSubmit}>
      <ProductGeneralInputs errors={errors} register={register} control={control} />
      <FormActions>
        <Button loading={formProductMutation.isLoading} type='submit' icon={<LuSave />}>
          Submit
        </Button>
      </FormActions>
    </Form>
  );
};

export { ProductForm };
