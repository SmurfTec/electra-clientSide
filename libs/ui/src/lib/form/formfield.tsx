import { isRequired } from './formUtils';
import { useEffect } from 'react';
import { useFormContext } from './formProvider';
import { Input, InputProps } from '../input';

type FormFieldProps = InputProps & {
  value?: string;
  label?: string;
  name: string;
  description?: string;
  onInputChanged?: (value: string | number) => void;
};

export const FormField = ({ label, type, name, description, onInputChanged, ...rest }: FormFieldProps) => {
  const { form, schema } = useFormContext<any>();
  useEffect(() => {
    if (onInputChanged) {
      if (form?.isTouched(name) || form?.isDirty()) {
        onInputChanged(form?.values[name]);
      }
    }
  }, [form?.values[name]]);

  return (
    <Input
      description={description}
      label={label}
      required={isRequired(name, schema!)}
      type={type}
      {...form?.getInputProps(name)}
      error={form?.isTouched(name) && form?.isDirty(name) ? form.errors[name] : ''}
      {...rest}
    />
  );
};

export default FormField;
