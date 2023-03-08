import { Form } from '@elektra/ui';
import { Button, createStyles, Stack } from '@mantine/core';
import Joi from 'joi';

export const PasswordChangeModel = () => {
  const { classes } = useStyles();
  const schema = Joi.object({
    currentPassword: Joi.string().required().label('Current Password'),
    newPassword: Joi.string()
      .min(8)
      .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
      .required()
      .label('New Password')
      .messages({
        'string.min': 'Must have at least 8 characters',
        'object.regex': 'Must have at least 8 characters',
        'string.pattern.base': 'User Password must have at least 8 characters one uppercase and special character',
      }),
  });
  const initialValues: any = {
    currentPassword: '',
    newPassword: '',
  };
  return (
    <Stack align="center" spacing="xl" className="mt-6">
      <Form initialValues={initialValues} onFormSubmit={() => console.log('')} schema={schema}>
        <div className="space-y-5">
          <Form.PasswordField
            name="currentPassword"
            placeholder="Enter current password"
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
          <Form.PasswordField
            name="newPassword"
            placeholder="Enter new password"
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
        </div>
        <div className="text-right mt-[-10px]">
          <Button className="bg-white hover:bg-white text-slate-300 px-0 text-right">Forgot Password ?</Button>
        </div>
        <div className="text-center">
          <Form.FormButton type="submit" label="Update" />
        </div>
      </Form>
    </Stack>
  );
};
const useStyles = createStyles((theme) => ({
  input: {
    borderRadius: 'unset',
    border: '1px solid black',
    height: '52px',
    width: '320px',
  },
  innerInput: {
    height: '52px',
    width: '320px',
  },
}));
