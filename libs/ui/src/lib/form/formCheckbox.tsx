import { Checkbox, CheckboxProps } from '../checkbox';
import { useEffect } from 'react';
import { useFormContext } from './formProvider';

export interface IFormCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  name: string;
  label: React.ReactNode;
  onChange?: (value: boolean) => void;
}

export const FormCheckbox = ({
  label,
  name,
  onChange,
  ...rest
}: IFormCheckboxProps) => {
  const { form } = useFormContext<any>();

  useEffect(() => {
    if (onChange) {
      if (form?.isTouched(name) || form?.isDirty()) {
        onChange(!!form?.values[name]);
      }
    }
  }, [form?.values[name]]);

  return (
    <Checkbox
      checked={form?.values[name]}
      defaultChecked={form?.values[name]}
      label={label}
      {...form?.getInputProps(name)}
      error={
        form?.isTouched(name) && form.isDirty(name)
          ? form?.getInputProps(name).error
          : ''
      }
      {...rest}
    />
  );
};

FormCheckbox.displayName = 'FormCheckbox';

FormCheckbox.defaultProps = {};
export default FormCheckbox;
