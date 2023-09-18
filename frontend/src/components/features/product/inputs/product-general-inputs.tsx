import { FormField } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { SelectClientSide } from '@/components/form/select/select-client-side';
import { Col, Row } from '@/components/ui/grid';
import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { Product } from '@/services/product.service';
import dynamic from 'next/dynamic';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { CategorySelect } from '../../category/selects/category-select';
import { ProductTypeSelect } from '../selects/product-type-select';

const ReactQuill = dynamic(() => import('@/components/form/react-quill').then((mod) => mod.ReactQuill), {
  ssr: false,
  loading: () => <InputSkeleton hasLabel={true} />
});

interface ProductGeneralInputsProps {
  register: UseFormRegister<Product>;
  errors: FieldErrors<Product>;
  control: Control<Product, any>;
}

const ProductGeneralInputs = ({ errors, register, control }: ProductGeneralInputsProps) => {
  return (
    <>
      <Row className='sm:grid-cols-3'>
        <Col className='sm:col-span-2'>
          <FormField error={errors?.name}>
            <Input {...register('name')} type='text' label='Name' placeholder='Enter name' />
          </FormField>
        </Col>
        <Col>
          <FormField error={errors?.price}>
            <Input
              {...register('price', { valueAsNumber: true })}
              type='number'
              label='Price'
              placeholder='Enter price'
            />
          </FormField>
        </Col>
      </Row>

      <Row className='sm:grid-cols-4'>
        <Col>
          <FormField error={errors?.type}>
            <ProductTypeSelect control={control} name='type' label='Type' placeholder='Select a type' />
          </FormField>
        </Col>

        <Col className='sm:col-span-2'>
          <FormField error={errors?.categoryId}>
            <CategorySelect control={control} name='categoryId' label='Category' placeholder='Select category' />
          </FormField>
        </Col>

        <Col>
          <FormField error={errors?.enabled}>
            <SelectClientSide
              name='enabled'
              label='Status'
              placeholder='Select status'
              control={control}
              options={[
                { label: 'Enabled', value: true },
                { label: 'Disabled', value: false }
              ]}
            />
          </FormField>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormField error={errors?.description}>
            <ReactQuill label='Description' name='description' control={control} />
          </FormField>
        </Col>
      </Row>
    </>
  );
};

export { ProductGeneralInputs };
