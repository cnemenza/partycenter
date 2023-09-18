import { SelectClientSide } from '@/components/form/select/select-client-side';
import { ProductConstants } from '@/constants';

interface ProductTypeSelectProps {
  name: string;
  label: string;
  control: any;
  placeholder: string;
}

const ProductTypeSelect = ({ name, label, control, placeholder, ...props }: ProductTypeSelectProps) => {
  const options = ProductConstants.ProductTypes.__array;
  return (
    <SelectClientSide
      {...props}
      options={options}
      name={name}
      label={label}
      control={control}
      placeholder={placeholder}
    />
  );
};

export { ProductTypeSelect };
