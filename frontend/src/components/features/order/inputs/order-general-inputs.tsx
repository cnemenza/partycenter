import { DatePicker } from '@/components/form/datepicker';
import { FormField, FormHeader } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { Col, Row } from '@/components/ui/grid';
import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { Order } from '@/services/order.service';
import dynamic from 'next/dynamic';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FcSettings } from 'react-icons/fc';

const DeliverySelect = dynamic(
  () => import('@/components/features/delivery/selects/delivery-select').then((mod) => mod.DeliverySelect),
  {
    loading: () => <InputSkeleton hasLabel={true} />
  }
);

const ClientSelect = dynamic(
  () => import('@/components/features/client/selects/client-select').then((mod) => mod.ClientSelect),
  {
    loading: () => <InputSkeleton hasLabel={true} />
  }
);

interface OrderGeneralInputsProps {
  orderId?: string;
  register: UseFormRegister<Order>;
  errors: FieldErrors<Order>;
  control: Control<Order, any>;
  onChangeEventDate?: (date: Date) => void;
  setValue: UseFormSetValue<Order>;
}

const OrderGeneralInputs = ({
  orderId,
  errors,
  register,
  control,
  onChangeEventDate,
  setValue
}: OrderGeneralInputsProps) => {
  return (
    <>
      <FormHeader icon={<FcSettings className='w-5 h-5' />} text='Order Information' />

      {orderId && (
        <Row>
          <Col>
            <FormField error={errors?.code}>
              <Input {...register('code')} type='text' label='Code' placeholder='Code' disabled className='font-bold' />
            </FormField>
          </Col>
        </Row>
      )}
      <input type='hidden' {...register('type')} />
      <Row className='sm:grid-cols-2'>
        <Col>
          <FormField error={errors?.clientId}>
            {orderId ? (
              <>
                <Input
                  {...register('client.fullName')}
                  type='text'
                  label='Client'
                  placeholder='Client'
                  disabled
                  className='font-bold'
                />
              </>
            ) : (
              <ClientSelect name='clientId' label='Client' control={control} placeholder='Select a client' />
            )}
          </FormField>
        </Col>
        <Col>
          <FormField error={errors?.eventDate}>
            <DatePicker
              label='Event Date'
              placeholder='Select event date'
              control={control}
              name='eventDate'
              onChange={(data) => {
                if (onChangeEventDate) onChangeEventDate(data);
              }}
            />
          </FormField>
        </Col>
      </Row>

      <Row className='sm:grid-cols-2'>
        <Col>
          <FormField error={errors?.deliveryId}>
            <DeliverySelect
              control={control}
              name='deliveryId'
              label='Delivery Zone'
              placeholder='Select a delivery zone'
              onChange={(data) => {
                setValue('shipping', data.price);
              }}
            />
          </FormField>
        </Col>
        <Col>
          <FormField error={errors?.eventAddress}>
            <Input
              {...register('eventAddress')}
              type='text'
              label='Event Address'
              placeholder='Enter event address'
              maxLength={80}
            />
          </FormField>
        </Col>
      </Row>
    </>
  );
};

export { OrderGeneralInputs };
