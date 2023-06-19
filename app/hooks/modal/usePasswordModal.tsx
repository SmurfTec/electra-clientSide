import { Modal as CModal, http, useStylesforGlobal } from '@elektra/customComponents';
import { Button, Center, PasswordInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useEmailVerificationModel } from './useEmailModal';
import { RootState, useSelector } from '@elektra/store';

type usePasswordChangeModalProps = {
  login?: boolean;
  code?:string
};

export const usePasswordChangeModal = ({
  login = false,
  code
}: usePasswordChangeModalProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { classes } = useStylesforGlobal();
  // const user = useSelector((state: RootState) => state.auth.user);
  // const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({
  //   email: String("user?.email"),
  //   purpose: '2fa',
  // });
  const initialValues = {
    password: '',
    passwordConfirm: '',
  };
  const form = useForm({
    initialValues,
    validate: {
      password: (value) => (value.length < 6 ? 'Password must be atleast 6 characters' : null),
      passwordConfirm: (value) => (value.length < 6 ? 'Password must be atleast 6 characters' : null),
    },
  });
  
  const handleReset = async (values: typeof initialValues) => {
    setLoading(true);
    if(login){
    const res = await http.request({
      url: `auth/set-password/${code}`,
      method: 'PUT',
      data:values
    });
    if (res.isError) {
      setLoading(false);
    } else {
      setLoading(false);
      close();
    }
  }
  else{
    const res = await http.request({
      url: 'auth/update-password',
      method: 'POST',
      data:values
    });
    if (res.isError) {
      setLoading(false);
    } else {
      setLoading(false);
      close();
    }
  }
  };

  const Modal = (
    <>
      <form onSubmit={form.onSubmit(handleReset)}>
        <Stack align="center" spacing="xl" className="mt-6">
          <div className="space-y-5">
            <PasswordInput
              placeholder={login ? 'Enter new password' : 'Enter current password'}
              classNames={{ input: classes.input, innerInput: classes.innerInput }}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder={login ? 'Confirm Password' : 'Enter new password'}
              classNames={{ input: classes.input, innerInput: classes.innerInput }}
              {...form.getInputProps('passwordConfirm')}
            />
          </div>
        </Stack>
        {login ? (
          <div className="text-center -ml-32 mt-1">
            <Text className="text-xs font-medium">Min password length 6 characters</Text>
          </div>
        ) : (
          <Center className="space-x-5 ml-1">
            <Text className="text-xs font-medium">Min password length 6 characters</Text>
            <Button
              styles={{
                root: {
                  padding: 'unset',
                  border: 'unset',
                  marginRight: '100px',
                  borderRadius: 'unset',
                },
                inner: {
                  color: '#B4B4B4',
                  background: 'white',
                },
              }}
            >
              Forgot Password ?
            </Button>
          </Center>
        )}
        <div className="text-center">
          <Button type="submit" loading={loading}>Update</Button>
        </div>
      </form>
      </>
  );
  return [Modal, opened, { open, close }];
};
