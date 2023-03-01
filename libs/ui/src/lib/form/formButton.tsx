import { isValid } from './formUtils';
import { useFormContext } from './formProvider';
import { Button, ButtonProps } from '../button';

interface FormButtonProps extends ButtonProps {
  label: string;
}

export const FormButton = ({ label, type, ...rest }: FormButtonProps) => {
  const { form, schema } = useFormContext<any>();
  return (
    <Button
      disabled={type === 'submit' ? !isValid(form?.values, schema) : false}
      label={label}
      onClick={(e) => handleClick(e)}
      type={type}
      {...rest}
    />
  );

  function handleClick(e: any) {
    if (type === 'reset') {
      form?.reset();
    }
  }
};

FormButton.defaultProps = {
  type: 'submit',
  label: 'Submit',
};

export default FormButton;
