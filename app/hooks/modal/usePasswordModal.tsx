import { Modal as Modl } from '@elektra/customComponents';
import { Button, Center, PasswordInput, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useStylesforGlobal } from '../../customComponents/theme';
import { useEmailVerificationModel } from './useEmailModal';

export const usePasswordChangeModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [emailModal, emailOpened, emailHandler] = useEmailVerificationModel({ email: 'dummy@example.com' });
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
        <Modl title="Email Verification" children={emailModal} onClose={emailHandler.close} open={emailOpened} />
      </Stack>
      <Center className="space-x-5">
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
      <div className="text-center">
        <Button onClick={emailHandler.open}>Update</Button>
      </div>
    </>
  );
  return [Modal, opened, { open, close }];
};
