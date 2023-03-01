import { ReactNode, createContext, useContext } from 'react';

import Joi from 'joi';
import { UseFormReturnType } from '@mantine/form';

interface FormContextProps<T extends unknown> {
  form: UseFormReturnType<T> | null;
  initialValues: T | null;
  schema?: Joi.Schema<T> | null;
}

interface FormProviderProps<T extends unknown> {
  children: ReactNode;
  value: FormContextProps<T>;
}

const createFormContext = <T extends unknown>() => {
  return createContext<FormContextProps<T>>({
    form: null,
    initialValues: null,
    schema: null,
  });
};

export const FormContext = createFormContext<any>();
export const FormContextProvider = FormContext.Provider;
export const FormContextConsumer = FormContext.Consumer;

// Provider component for FormContext
export const FormProvider = <T extends object>({ children, value }: FormProviderProps<T>) => {
  return <FormContextProvider value={value}>{children}</FormContextProvider>;
};

// Form Hooks
export const useFormContext = <T extends object>() => {
  const form: FormContextProps<T> = useContext(FormContext);
  return form;
};
