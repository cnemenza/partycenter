import { Form, FormActions } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { NotFoundResult } from '@/components/ui/result/not-found';
import { OrderConstants } from '@/constants';
import { Order, createOrder, getOrder, updateOrder } from '@/services/order.service';
import { dateToStringDetailed } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuSave } from 'react-icons/lu';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import * as z from 'zod';
import { OrderConfirmAlertDialogProps, OrderSuccessAlertDialog } from '../alert-dialogs/order-success-alert-dialog';
import { OrderAmountInputs } from '../inputs/order-amount-input';
import { OrderDetailInputs } from '../inputs/order-detail-inputs';
import { OrderGeneralInputs } from '../inputs/order-general-inputs';

interface OrderFormProps {
  editId?: string;
  notFoundReturnUrl?: string;
}

const orderDetailsValidationSchema = z.object({
  productId: z.string().nonempty(),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative()
});

const orderPaymentValidationSchema = z.object({
  prepaid: z.number().nonnegative(),
  balance: z.number().nonnegative(),
  type: z.string()
});

const orderValidationSchema = z.object({
  type: z.string(),
  clientId: z.string().nonempty(),
  eventAddress: z.string().max(200).nonempty(),
  eventDate: z.date(),
  deliveryId: z.string().nonempty(),
  orderDetails: z.array(orderDetailsValidationSchema),
  orderPayment: orderPaymentValidationSchema,
  subTotal: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total: z.number().nonnegative(),
  observations: z
    .string()
    .nullable()
    .optional()
    .transform((value) => {
      if (value === '') return null;
      return value;
    }),
  withTax: z.boolean()
});

const OrderForm = ({ editId, notFoundReturnUrl }: OrderFormProps) => {
  const [eventDate, setEventDate] = useState<Date | null>(null);

  const [orderConfirmAlert, setOrderConfirmAlert] = useState<OrderConfirmAlertDialogProps>();

  const formOrderMutation = useMutation({
    mutationFn: async (data: Order) => {
      return !!editId ? updateOrder(editId!, data) : createOrder(data);
    },
    onSuccess: () => {
      const description = `Record ${!!editId ? 'edited' : 'created'} successfully.`;

      toast.success('Completed', {
        description: description
      });
    },
    onError: (error) => {
      toast.error('Error', {
        description: error as any
      });
    },
    retry: 1
  });

  const getOrderFn = async () => {
    return await getOrder(editId!);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ['get-product', editId],
    queryFn: getOrderFn,
    enabled: !!editId,
    onSuccess: (data) => {
      const { orderDetails, ...rest } = data;
      const eventDate = new Date(data.eventDate);

      reset({
        ...rest,
        eventDate: eventDate,
        orderDetails: orderDetails.map((item, index) => {
          return {
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            product: {
              name: item.product?.name
            }
          };
        })
      });

      setEventDate(eventDate);
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm<Order>({
    defaultValues: {
      withTax: true,
      type: OrderConstants.OrderTypes.VALUES.INTERNAL,
      orderPayment: {
        type: OrderConstants.OrderPaymentTypes.VALUES.MANUAL
      }
    },
    resolver: zodResolver(orderValidationSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await formOrderMutation.mutateAsync(data);

    setOrderConfirmAlert({
      title: `Order ${!!editId ? 'edited' : 'created'} successfully`,
      code: result.code,
      createdBy: result.createdBy,
      creationDate: result.createdAt ? dateToStringDetailed(new Date(result.createdAt)) : '-',
      show: true,
      orderId: result.id,
      hrefConfirm: '/dashboard/orders'
    });
  });

  return isError ? (
    <NotFoundResult title='Order not found!' text='The searched order does not exist ' href={notFoundReturnUrl} />
  ) : (
    <Form isFetching={isLoading} onSubmit={onSubmit}>
      <OrderGeneralInputs
        orderId={editId}
        onChangeEventDate={(date) => setEventDate(date)}
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
      />

      {eventDate && (
        <>
          <OrderDetailInputs
            orderId={editId == null ? undefined : editId}
            date={eventDate}
            errors={errors}
            watch={watch}
            register={register}
            control={control}
          />
          <OrderAmountInputs setValue={setValue} errors={errors} register={register} watch={watch} />
          <FormActions>
            <Button loading={formOrderMutation.isLoading} type='submit' icon={<LuSave />}>
              Submit
            </Button>
          </FormActions>
        </>
      )}

      {orderConfirmAlert && orderConfirmAlert.show && (
        <OrderSuccessAlertDialog
          title={orderConfirmAlert.title}
          show={orderConfirmAlert.show}
          orderId={orderConfirmAlert?.orderId}
          code={orderConfirmAlert?.code}
          createdBy={orderConfirmAlert?.createdBy}
          creationDate={orderConfirmAlert?.creationDate}
          hrefConfirm={orderConfirmAlert?.hrefConfirm}
        />
      )}
    </Form>
  );
};

export { OrderForm };
