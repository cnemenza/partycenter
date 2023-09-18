'use client';

import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { default as ReactSelect } from 'react-select';

interface OptionType {
  value: string | boolean;
  label: string;
}

interface SelectServerSideProps {
  label: string;
  control?: any;
  name?: string;
  options: OptionType[];
  placeholder: string;
  onChange?: (val: any) => void;
}

const SelectClientSide = ({ control = null, name, options, placeholder, label, ...props }: SelectServerSideProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => setIsMounted(true), []);
  return control === null ? (
    <>
      {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
      <ReactSelect {...props} options={options} placeholder={placeholder} />
    </>
  ) : (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, onBlur, value } }) =>
        isMounted ? (
          <>
            {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
            <ReactSelect
              {...props}
              options={options}
              placeholder={placeholder}
              onChange={(val: any) => {
                if (props.onChange) props.onChange(val);
                onChange(val.value);
              }}
              onBlur={onBlur}
              value={options.find((x) => x.value === value)}
            />
          </>
        ) : (
          <InputSkeleton hasLabel={label ? true : false} />
        )
      }
    />
  );
};

export { SelectClientSide, type OptionType };
