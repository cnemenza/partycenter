import { FormField, FormHeader } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { Alert } from '@/components/ui/alert';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Col, Row } from '@/components/ui/grid';
import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { Client } from '@/services/client.service';
import dynamic from 'next/dynamic';
import { Control, FieldErrors, UseFormRegister, useFieldArray } from 'react-hook-form';
import { FcShipped } from 'react-icons/fc';
import { FiTrash2 } from 'react-icons/fi';
import { IoAddSharp } from 'react-icons/io5';

const DeliverySelect = dynamic(
  () => import('@/components/features/delivery/selects/delivery-select').then((mod) => mod.DeliverySelect),
  {
    ssr: true,
    loading: () => <InputSkeleton hasLabel={true} />
  }
);

interface ClientAddressInputsProps {
  register: UseFormRegister<Client>;
  errors: FieldErrors<Client>;
  control: Control<Client, any>;
}

const ClientAddressInputs = ({ errors, register, control }: ClientAddressInputsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'clientAddresses'
  });

  return (
    <>
      <FormHeader icon={<FcShipped className='w-5 h-5' />} text='Address Management'>
        <Button
          size='sm'
          type='button'
          variant='dark'
          onClick={() => {
            append({
              deliveryId: '',
              address: ''
            });
          }}
          icon={<IoAddSharp className='h-5 w-5' />}
        >
          Address
        </Button>
      </FormHeader>

      {fields.length == 0 && (
        <Alert variant='dark' message='No addresses found, you can add by clicking the "Address Button".' />
      )}

      {fields.map((item, index) => {
        return (
          <Row key={item.id} className='sm:grid-cols-2'>
            <Col>
              <FormField error={errors?.clientAddresses && errors?.clientAddresses[index]?.deliveryId}>
                <DeliverySelect
                  control={control}
                  name={`clientAddresses.${index}.deliveryId`}
                  label='Delivery Zone'
                  placeholder='Select a delivery zone'
                />
              </FormField>
            </Col>

            <Col className='flex'>
              <FormField className='w-11/12' error={errors?.clientAddresses && errors?.clientAddresses[index]?.address}>
                <Input
                  {...register(`clientAddresses.${index}.address`)}
                  type='text'
                  label='Address'
                  placeholder='Enter address'
                  maxLength={200}
                />
              </FormField>

              <div className='w-1/12 flex justify-center items-center'>
                <ButtonIcon className='mt-5' type='button' title='Delete' asChild onClick={() => remove(index)}>
                  <FiTrash2 className='w-5 h-5 text-danger' />
                </ButtonIcon>
              </div>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export { ClientAddressInputs };
