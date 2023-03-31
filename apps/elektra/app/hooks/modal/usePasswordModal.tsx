import { Button, PasswordInput, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useStylesforGlobal } from '../../customComponents/theme';

export const usePasswordChangeModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const { classes } = useStylesforGlobal();

  const Modal = (
    <>
      <Stack align="center" spacing="xl" className="mt-6">
        <div className="space-y-5">
          <PasswordInput
            placeholder="Enter current password"
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
          <PasswordInput
            placeholder="Enter new password"
            classNames={{ input: classes.input, innerInput: classes.innerInput }}
          />
        </div>
      </Stack>
      <div className="text-right -mt-2">
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
      </div>
      <div className="text-center">
        <Button>Update</Button>
      </div>
    </>
  );
  return [Modal, opened, { open, close }];
};
