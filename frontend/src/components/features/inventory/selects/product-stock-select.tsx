import { SelectClientSide } from '@/components/form/select/select-client-side';
import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { ProductStock, getProductsStock } from '@/services/inventory.service';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useQuery } from 'react-query';

interface ProductStockSelectProps {
  name?: string;
  label: string;
  placeholder: string;
  control?: any;
  date: Date;
  orderId?: string;
  onChange: (data: any) => void;
  setProductStockOptions?: Dispatch<SetStateAction<ProductStock[] | null>>;
}

interface ProductStockSelectOptions {
  value: string;
  label: string;
  name: string;
  availableStock: number;
  price: number;
}

const ProductStockSelect = ({
  date,
  name,
  label,
  placeholder,
  control,
  orderId,
  onChange,
  setProductStockOptions,
  ...props
}: ProductStockSelectProps) => {
  const getProductsStockFn = async () => getProductsStock(date, orderId);

  const { data, isFetching, refetch } = useQuery('select-product-stock', getProductsStockFn, {
    onSuccess: (data) => {
      if (setProductStockOptions) setProductStockOptions(data);
    }
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return isFetching ? (
    <InputSkeleton hasLabel={true} />
  ) : (
    <SelectClientSide
      {...props}
      options={
        data?.map((item) => {
          return {
            value: item.id,
            label: `${item.name} - Stock : ${item.availableStock}`,
            name: item.name,
            availableStock: item.availableStock,
            price: item.price
          } as ProductStockSelectOptions;
        }) || []
      }
      name={name}
      onChange={onChange}
      label={label}
      control={control}
      placeholder={placeholder}
    />
  );
};

export { ProductStockSelect, type ProductStockSelectOptions };
