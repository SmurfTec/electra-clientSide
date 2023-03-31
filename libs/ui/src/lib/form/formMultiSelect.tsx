import { MultiSelect, MultiSelectProps } from '../multiSelect';

import { isRequired } from './formUtils';
import { useFormContext } from './formProvider';

type FormMultiSelectProps = MultiSelectProps & {
  label?: string;
  name: string;
  data: Array<string>;
  description?: string;
  icon?: React.ReactNode;
};

export const FormMultiSelect = ({
  label,
  name,
  description,
  data,
  placeholder,
  defaultValue,
  ...rest
}: FormMultiSelectProps) => {
  const { form, schema } = useFormContext<any>();

  return (
    <MultiSelect
      description={description}
      label={label}
      data={data}
      required={isRequired(name, schema!)}
      searchable
      placeholder={placeholder}
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
