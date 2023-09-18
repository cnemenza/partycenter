import { OptionType, SelectClientSide } from '@/components/form/select/select-client-side';
import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { getDeliveries } from '@/services/delivery.service';
import { useQuery } from 'react-query';

interface DeliveryOptions extends OptionType {
  price: number;
}

interface DeliverySelectProps {
  name: string;
  label: string;
  placeholder: string;
  control: any;
  onChange?: (val: DeliveryOptions) => void;
}

const DeliverySelect = ({ name, label, placeholder, control, onChange, ...props }: DeliverySelectProps) => {
  const { data, isLoading } = useQuery('select-delivery', getDeliveries);

  return isLoading ? (
    <InputSkeleton hasLabel={true} />
  ) : (
    <SelectClientSide
      {...props}
      options={
        data?.map((item) => {
          return {
            value: item.id,
            label: item.description,
            price: item.price
          };
        }) || []
      }
      onChange={onChange}
      name={name}
      label={label}
      control={control}
      placeholder={placeholder}
    />
  );
};

export { DeliverySelect };
