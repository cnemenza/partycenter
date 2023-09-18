import { Checkbox } from '@/components/form/checkbox';
import { FormField, FormHeader } from '@/components/form/form';
import { InputLabel } from '@/components/form/input';
import { TextArea } from '@/components/form/text-area';
import { Col, Row } from '@/components/ui/grid';
import { Order } from '@/services/order.service';
import { generatePayments } from '@/utils';
import { useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FcMoneyTransfer } from 'react-icons/fc';

interface OrderAmountInputsProps {
  errors: FieldErrors<Order>;
  register: UseFormRegister<Order>;
  watch: UseFormWatch<Order>;
  setValue: UseFormSetValue<Order>;
}

const OrderAmountInputs = ({ errors, register, watch, setValue }: OrderAmountInputsProps) => {
  const values = watch();

  const calculateTotalAmounts = () => {
    const result = generatePayments(values);
    if (values.tax != result.tax) setValue('tax', result.tax);
    if (values.subTotal != result.subTotal) setValue('subTotal', result.subTotal);
    if (values.total != result.total) setValue('total', result.total);
    if (values.orderPayment.balance != result.balance) setValue('orderPayment.balance', result.balance);
  };

  useEffect(() => {
    calculateTotalAmounts();
  }, [values, setValue]);

  return (
    <>
      <Row className='sm:grid-cols-3'>
        <Col className='sm:col-span-2'>
          <FormField error={errors?.observations}>
            <TextArea label='Observations' {...register('observations')} rows={4} placeholder='Enter observations' />
          </FormField>
        </Col>
        <Col className='space-y-2'>
          <FormField error={errors?.subTotal}>
            <InputLabel
              className='min-w-[6rem] w-[6rem]'
              type='number'
              label='SubTotal'
              placeholder='0.00'
              {...register('subTotal', { valueAsNumber: true })}
              disabled
            />
          </FormField>

          <FormField error={errors?.tax}>
            <InputLabel
              className='min-w-[6rem] w-[6rem] gap-2'
              type='number'
              label='Tax'
              {...register('tax', { valueAsNumber: true })}
              disabled
            >
              <Checkbox {...register('withTax')} />
            </InputLabel>
          </FormField>

          <FormField error={errors?.shipping}>
            <InputLabel
              className='min-w-[6rem] w-[6rem]'
              type='number'
              label='Shipping'
              placeholder='0.00'
              {...register('shipping', { valueAsNumber: true })}
            />
          </FormField>

          <FormField error={errors?.discount}>
            <InputLabel
              className='min-w-[6rem] w-[6rem]'
              type='number'
              label='Discount'
              defaultValue={0}
              placeholder='0.00'
              {...register('discount', { valueAsNumber: true })}
            />
          </FormField>

          <FormField error={errors?.total}>
            <InputLabel
              className='min-w-[6rem] w-[6rem]'
              type='number'
              label='Total'
              placeholder='0.00'
              disabled
              {...register('total', { valueAsNumber: true })}
            />
          </FormField>

          <FormHeader
            className='!mt-4 !mb-4'
            icon={<FcMoneyTransfer className='w-5 h-5' />}
            text='Payment Conditions'
          />

          <FormField error={errors?.orderPayment?.prepaid}>
            <InputLabel
              className='min-w-[6rem] w-[6rem]'
              type='number'
              label='Prepaid'
              placeholder='0.00'
              defaultValue={0}
              {...register('orderPayment.prepaid', { valueAsNumber: true })}
            />
          </FormField>

          <FormField error={errors?.orderPayment?.balance}>
            <InputLabel
              className='min-w-[6rem] w-[6rem]'
              type='number'
              label='Balance'
              placeholder='0.00'
              disabled
              {...register('orderPayment.balance', { valueAsNumber: true })}
            />
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export { OrderAmountInputs };
