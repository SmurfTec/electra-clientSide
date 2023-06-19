import { http, useStylesforGlobal } from '@elektra/customComponents';
import { Button, PasswordInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

type useLoginPasswordChangeModalProps = {
  code?: string;
};

export const useLoginPasswordChangeModal = ({
  code,
}: useLoginPasswordChangeModalProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { classes } = useStylesforGlobal();
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
    const res = await http.request({
      url: `auth/set-password/${code}`,
      method: 'PUT',
      data: values,
    });
    if (res.isError) {
      setLoading(false);
    } else {
      setLoading(false);
      close();
    }
  };

  const Modal = (
    <>
      <form onSubmit={form.onSubmit(handleReset)}>
        <Stack align="center" spacing="xl" className="mt-6">
          <div className="space-y-5">
            <PasswordInput
              placeholder={'Enter new password'}
              classNames={{ input: classes.input, innerInput: classes.innerInput }}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder={'Confirm Password'}
              classNames={{ input: classes.input, innerInput: classes.innerInput }}
              {...form.getInputProps('passwordConfirm')}
            />
          </div>
        </Stack>
        <div className="text-center -ml-32 mt-1">
          <Text className="text-xs font-medium">Min password length 6 characters</Text>
        </div>
        <div className="text-center">
          <Button type="submit" loading={loading}>
            Update
          </Button>
        </div>
      </form>
    </>
  );
  return [Modal, opened, { open, close }];
};
