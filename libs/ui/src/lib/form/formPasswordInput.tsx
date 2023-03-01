import { PasswordInput, PasswordInputProps } from '../input';
import { useEffect } from 'react';
import { useFormContext } from './formProvider';
import { isRequired } from './formUtils';

type PasswordInputFieldProps = PasswordInputProps & {
  value?: string;
  label?: string;
  name: string;
  description?: string;
  onInputChanged?: (value: string | number) => void;
};

export const PasswordInputField = ({ label, name, description, onInputChanged, ...rest }: PasswordInputFieldProps) => {
  const { form, schema } = useFormContext<any>();

  useEffect(() => {
    if (onInputChanged) {
      if (form?.isTouched(name) || form?.isDirty()) {
        onInputChanged(form?.values[name]);
      }
    }
  }, [form?.values[name]]);

  return (
    <PasswordInput
      description={description}
      label={label}
      required={isRequired(name, schema!)}
      error={form?.isTouched(name) || form?.isDirty(name) ? form.errors[name] : ''}
      {...form?.getInputProps(name)}
      {...rest}
    />
  );
};

export default PasswordInputField;
