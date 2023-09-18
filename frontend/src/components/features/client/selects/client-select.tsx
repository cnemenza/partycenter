import { SelectServerSide } from '@/components/form/select/select-server-side';
import { getClients } from '@/services/client.service';

interface ClientSelectProps {
  name: string;
  label?: string;
  control?: any;
  placeholder: string;
}

const ClientSelect = ({ name, label, control, placeholder, ...props }: ClientSelectProps) => {
  const loadOptions = async (inputValue: string) => {
    const result = await getClients(inputValue, 5);
    const options = result.map((item) => {
      return {
        value: item.id,
        label: item.fullName
      };
    });

    return {
      options,
      hasMore: false
    };
  };

  return (
    <SelectServerSide
      {...props}
      name={name}
      label={label}
      control={control}
      placeholder={placeholder}
      loadOptions={loadOptions}
    />
  );
};

export { ClientSelect };
