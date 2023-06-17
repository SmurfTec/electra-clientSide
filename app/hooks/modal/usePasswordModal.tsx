import { http } from '@elektra/customComponents';
import { Button, Center, PasswordInput, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useStylesforGlobal } from '../../customComponents/theme';

type usePasswordChangeModalProps = {
  login?: boolean;
};

export const usePasswordChangeModal = ({
  login = false,
}: usePasswordChangeModalProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { classes } = useStylesforGlobal();

  const handleReset = async () => {
    const res = await http.request({
      url: 'auth/confirm-signup',
      // data: { code },
      method: 'POST',
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
      <Stack align="center" spacing="xl" className="mt-6">
        <div className="space-y-5">
          <PasswordInput
            placeholder={login ? 'Enter new password' : 'Enter current password'}
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
          <PasswordInput
            placeholder={login ? 'Confirm Password' : 'Enter new password'}
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
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
        <Button onClick={handleReset}>Update</Button>
      </div>
    </>
  );
  return [Modal, opened, { open, close }];
};
