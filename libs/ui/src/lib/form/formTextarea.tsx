import { isRequired } from './formUtils';
import { useFormContext } from './formProvider';
import { TextareaInput, TextareaInputProps } from '../input';

type FormAreaFieldProps = TextareaInputProps & {
  value?: string;
  label?: string;
  name: string;
  description?: string;
};

export const FormAreaField = ({
  label,
  name,
  description,
  ...rest
}: FormAreaFieldProps) => {
  const { form, schema } = useFormContext<any>();

  return (
    <TextareaInput
      description={description}
      label={label}
      required={isRequired(name, schema!)}
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

export default FormAreaField;
