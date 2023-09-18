import { SelectClientSide } from '@/components/form/select/select-client-side';
import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { getCategories } from '@/services/category.service';
import { useQuery } from 'react-query';

interface CategorySelectProps {
  name: string;
  label: string;
  placeholder: string;
  control: any;
}

const CategorySelect = ({ name, label, placeholder, control, ...props }: CategorySelectProps) => {
  const { data, isLoading } = useQuery('select-category', getCategories);

  return isLoading ? (
    <InputSkeleton hasLabel={true} />
  ) : (
    <SelectClientSide
      {...props}
      options={
        data?.map((item) => {
          return {
            value: item.id,
            label: item.name
          };
        }) || []
      }
      name={name}
      label={label}
      control={control}
      placeholder={placeholder}
    />
  );
};

export { CategorySelect };
