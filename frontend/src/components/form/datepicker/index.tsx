import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';

interface DatePickerProps {
  label?: string;
  control?: any;
  name?: string;
  placeholder: string;
  showIcon?: boolean;
  isClearable?: boolean;
  onChange?: (val: any) => void;
}

const DatePicker = ({ label, control = null, name, placeholder, ...props }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return control === null ? (
    <>
      {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
      <ReactDatePicker
        {...props}
        className='form-input'
        onChange={(date) => {
          if (props.onChange) props.onChange(date);
          setStartDate(date);
        }}
        selected={startDate}
        placeholderText={placeholder}
        dateFormat='MM/dd/yyyy'
      />
    </>
  ) : (
    <Controller
      control={control}
      name={name!}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
          <ReactDatePicker
            {...props}
            className='form-input'
            onChange={(date) => {
              if (props.onChange) props.onChange(date);
              onChange(date);
            }}
            onBlur={onBlur}
            selected={value}
            placeholderText={placeholder}
            dateFormat='MM/dd/yyyy'
          />
        </>
      )}
    />
  );
};

export { DatePicker };
