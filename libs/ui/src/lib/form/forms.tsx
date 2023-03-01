import { FormEvent, useEffect } from 'react';
import { joiResolver, useForm } from '@mantine/form';

import FormAreaField from './formTextarea';
import { FormButton } from './formButton';
import { FormCheckbox } from './formCheckbox';
import { FormField } from './formfield';
import { FormMultiSelect } from './formMultiSelect';
import { FormProvider } from './formProvider';
import { FormSelect } from './formSelect';
import {PasswordInputField} from './formPasswordInput';
import Joi from 'joi';
import NumberField from './formNumberField';

export interface FormProps<T extends object> extends React.ComponentPropsWithRef<'form'> {
  initialValues: T;
  schema?: Joi.Schema<T>;
  onFormSubmit: (values: T) => void;
}

export const Form = <T extends object>({ initialValues, children, onFormSubmit, schema, ...rest }: FormProps<T>) => {
  const form = useForm<T>({
    initialValues,
    validate: joiResolver(schema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.resetTouched();
  }, []);

  useEffect(() => {
    if (form.isTouched() && form.isDirty()) {
      form.setErrors(joiResolver(schema)(form.values));
    }
  }, [form.values]);

  return (
    <FormProvider value={{ form, initialValues, schema }}>
      <form onSubmit={handleFormSubmit} {...rest}>
        {children}
      </form>
    </FormProvider>
  );

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (onFormSubmit) {
      onFormSubmit(form?.values);
    }
  }
};

Form.FormField = FormField;
Form.Select = FormSelect;
Form.FormButton = FormButton;
Form.FormCheckbox = FormCheckbox;
Form.AreaField = FormAreaField;
Form.MultiSelect = FormMultiSelect;
Form.NumberField = NumberField;
Form.PasswordField = PasswordInputField

export default Form;
