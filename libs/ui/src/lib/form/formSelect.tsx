import { Select, SelectProps } from '../select';
import { isRequired } from './formUtils';
import { useEffect } from 'react';
import { useFormContext } from './formProvider';

type FormFieldProps = Omit<SelectProps, 'onChange'> & {
  value?: string;
  label?: string;
  name: string;
  description?: string;
  onSelectionChanged?: (value: string | null) => void;
};

export const FormSelect = ({
  label,
  name,
  description,
  onSelectionChanged,
  defaultValue,
  ...rest
}: FormFieldProps) => {
  const { form, schema } = useFormContext<any>();

  useEffect(() => {
    if (defaultValue) {
      if (form?.values[name] === undefined || form?.values[name] === '')
        form?.setFieldValue(name, defaultValue);
    }
  }, []);

  useEffect(() => {
    if (onSelectionChanged) {
      if (form?.isTouched(name)) {
        onSelectionChanged(form?.values[name]);
      }
    }
  }, [form?.values[name]]);

  return (
    <Select
      description={description}
      defaultValue={defaultValue}
      label={label}
      required={isRequired(name, schema!)}
      searchable
      placeholder="Select one item below"
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
