import { FormField, FormHeader } from '@/components/form/form';
import { Input } from '@/components/form/input';
import { ButtonIcon } from '@/components/ui/button';
import { Col, Row } from '@/components/ui/grid';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductStock } from '@/services/inventory.service';
import { Order, OrderDetail } from '@/services/order.service';
import { roundTwoDecimals } from '@/utils';
import { useState } from 'react';
import { Control, FieldErrors, UseFormRegister, UseFormWatch, useFieldArray } from 'react-hook-form';
import { FcTodoList } from 'react-icons/fc';
import { FiSettings, FiTrash2 } from 'react-icons/fi';
import { ProductStockSelect, ProductStockSelectOptions } from '../../inventory/selects/product-stock-select';

interface OrderDetailInputsProps {
  orderId?: string;
  date: Date;
  register: UseFormRegister<Order>;
  errors: FieldErrors<Order>;
  control: Control<Order, any>;
  watch: UseFormWatch<Order>;
}

const OrderDetailInputs = ({ orderId, date, register, errors, control, watch }: OrderDetailInputsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orderDetails'
  });

  const [productStock, setProductStock] = useState<ProductStock[] | null>(null);

  const orderSubscription = watch();

  return (
    <>
      <FormHeader icon={<FcTodoList className='w-5 h-5' />} text='Order Details' />

      <Row>
        <Col>
          <ProductStockSelect
            orderId={orderId}
            date={date}
            label='Search product'
            placeholder='Enter product to add'
            onChange={(data: ProductStockSelectOptions) => {
              append({
                productId: data.value,
                availableStock: data.availableStock,
                product: {
                  name: data.name
                },
                price: data.price
              } as OrderDetail);
            }}
            setProductStockOptions={setProductStock}
          />
        </Col>
      </Row>

      <Row>
        <Table className='table-no-padding'>
          <TableHeader>
            <TableRow>
              <TableHead className='min-w-[14rem]'>Product</TableHead>
              <TableHead className='w-[6rem] !text-center'>Available</TableHead>
              <TableHead className='min-w-[8rem] w-[8rem] !text-center'>Quantity</TableHead>
              <TableHead className='min-w-[8rem] w-[8rem] !text-center'>Price</TableHead>
              <TableHead className='w-[7rem] !text-center'>Total</TableHead>
              <TableHead className='w-[3.5rem]'>
                <FiSettings className='w-4.5 h-4.5' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.length == 0 && (
              <TableRow>
                <TableCell className='!text-center' colSpan={6}>
                  No records found
                </TableCell>
              </TableRow>
            )}

            {fields.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{fields[index].product?.name}</TableCell>
                  <TableCell className='!text-center'>
                    {productStock?.find((element) => element.id == orderSubscription.orderDetails[index].productId)
                      ?.availableStock ?? 0}
                  </TableCell>
                  <TableCell>
                    <FormField error={errors?.orderDetails && errors?.orderDetails[index]?.quantity}>
                      <Input {...register(`orderDetails.${index}.quantity`, { valueAsNumber: true })} type='number' />
                    </FormField>
                  </TableCell>
                  <TableCell className='!text-center'>
                    <FormField error={errors?.orderDetails && errors?.orderDetails[index]?.price}>
                      <Input {...register(`orderDetails.${index}.price`, { valueAsNumber: true })} type='number' />
                    </FormField>
                  </TableCell>
                  <TableCell className='!text-center'>
                    {roundTwoDecimals(
                      (orderSubscription.orderDetails[index].quantity ?? 0) *
                        orderSubscription.orderDetails[index].price
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <ButtonIcon type='button' title='Delete' asChild onClick={() => remove(index)}>
                      <FiTrash2 className='w-4.5 h-4.5 text-danger' />
                    </ButtonIcon>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Row>
    </>
  );
};

export { OrderDetailInputs };
