import { Button, PasswordInput, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useStylesforGlobal } from '../../components/theme';

export const usePasswordChangeModel = ():[React.ReactNode, boolean, { open: () => void; close: () => void }] => {

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
      <div className="text-right mr-[100px]  -mt-[10px]">
        <Button
          styles={{
            root: {
              padding: 'unset',
              border: 'unset',
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