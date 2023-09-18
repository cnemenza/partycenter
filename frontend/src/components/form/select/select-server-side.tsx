import { InputSkeleton } from '@/components/ui/skeleton/input-skeleton';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

interface SelectServerSideProps {
  label?: string;
  control?: any;
  name?: string;
  placeholder: string;
  minimumCharacters?: number;
  loadOptions: (inputValue: string) => Promise<any>;
}

const SelectServerSide = ({
  control = null,
  name,
  label,
  placeholder,
  minimumCharacters = 2,
  loadOptions,
  ...props
}: SelectServerSideProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleInputChange = useCallback((typedOption: string) => {
    if (typedOption.length >= minimumCharacters) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, []);

  const load = async (inputValue: string) => {
    if (!showOptions)
      return {
        options: [],
        hasMore: false
      };

    const result = await loadOptions(inputValue);
    return result;
  };

  return control === null ? (
    <AsyncPaginate
      {...props}
      filterOption={() => true}
      loadOptions={load as LoadOptions<any, any, any>}
      onInputChange={handleInputChange}
      placeholder={placeholder}
      debounceTimeout={800}
      loadingMessage={({ inputValue }) =>
        !inputValue || inputValue.length < minimumCharacters
          ? `Please enter minimum ${minimumCharacters} characters`
          : 'Loading...'
      }
      noOptionsMessage={({ inputValue }) =>
        !inputValue || inputValue.length < minimumCharacters
          ? `Please enter minimum ${minimumCharacters} characters`
          : 'No results found'
      }
    />
  ) : (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, onBlur, value } }) =>
        isMounted ? (
          <>
            {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
            <AsyncPaginate
              {...props}
              onChange={(val: any) => {
                onChange(val.value);
              }}
              onBlur={onBlur}
              loadOptions={load as LoadOptions<any, any, any>}
              onInputChange={handleInputChange}
              placeholder={placeholder}
              debounceTimeout={800}
              loadingMessage={({ inputValue }) =>
                !inputValue || inputValue.length < minimumCharacters
                  ? `Please enter minimum ${minimumCharacters} characters`
                  : 'Loading...'
              }
              noOptionsMessage={({ inputValue }) =>
                !inputValue || inputValue.length < minimumCharacters
                  ? `Please enter minimum ${minimumCharacters} characters`
                  : 'No results found'
              }
            />
          </>
        ) : (
          <InputSkeleton hasLabel={label ? true : false} />
        )
      }
    />
  );
};

export { SelectServerSide };
