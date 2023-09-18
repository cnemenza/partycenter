import { Controller } from 'react-hook-form';
import { default as Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ReactQuillProps {
  label: string;
  name: string;
  control: any;
}

const ReactQuill = ({ label, name, control, ...props }: ReactQuillProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          {label && <label htmlFor={label.toLowerCase()}>{label}</label>}
          <Quill
            {...props}
            theme='snow'
            onBlur={onBlur}
            value={value}
            onChange={(text) => {
              onChange(text);
            }}
          />
        </>
      )}
    />
  );
};

export { ReactQuill };
