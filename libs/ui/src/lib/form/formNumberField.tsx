import { NumberInput, NumberInputProps } from '../number-input';

import { isRequired } from './formUtils';
import { useEffect } from 'react';
import { useFormContext } from './formProvider';

type NumberFieldProps = NumberInputProps & {
  value?: string;
  label?: string;
  name: string;
  description?: string;
  onInputChanged?: (value: string | number) => void;
};

export const NumberField = ({
  label,
  name,
  description,
  onInputChanged,
  ...rest
}: NumberFieldProps) => {
  const { form, schema } = useFormContext<any>();

  useEffect(() => {
    if (onInputChanged) {
      if (form?.isTouched(name) || form?.isDirty()) {
        onInputChanged(form?.values[name]);
      }
    }
  }, [form?.values[name]]);

  return (
    <NumberInput
      description={description}
      label={label}
      required={isRequired(name, schema!)}
      error={
        form?.isTouched(name) || form?.isDirty(name) ? form.errors[name] : ''
      }
      {...form?.getInputProps(name)}
      min={0}
      precision={0}
      hideControls
      {...rest}
    />
  );
};

export default NumberField;
