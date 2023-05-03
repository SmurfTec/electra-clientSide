import { Modal as Mdol } from '@elektra/customComponents';
import { Button, NumberInput, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Mail } from 'tabler-icons-react';

type EmailModelProps = {
  email: string;
};

export const useEmailVerificationModel = ({ email }: EmailModelProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [emailModal, emailOpened, emailHandler] = useEmailSentModal({email:'dummy@example.com'});
  const [error, setError] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      code: '',
    },
    validate: {
      code: (value) => (value.length < 6 ? 'atleast 6 digit' : null),
    },
  });
  const handleSubmit = (code: string) => {
    if (Number(code) === 1234) {
      setError(false);
      console.log(code);
    }
    setError(true);
  };
  const Modal = (
    <Stack align="center" spacing="xl" className="mt-6">
      {!error && (
        <Text size="sm" className="font-semibold">
          An email has been sent on {email}.<br></br>&nbsp;For verification please enter code in the email below
        </Text>
      )}
      {error && (
        <Text size="sm" className="font-semibold" color="red">
          Please enter correct code
        </Text>
      )}
       <Mdol
         
          children={emailModal}
          onClose={emailHandler.close}
          open={emailOpened}
        />
      <form onSubmit={form.onSubmit(({ code }) => handleSubmit(code))}>
        <NumberInput
          className="w-[100%] mr-20"
          size="lg"
          type="number"
          min={0}
          hideControls
          styles={{
            input: {
              borderRadius: 'unset',
              textAlign: 'center',
              color: '#3C82D6',
              fontWeight: 'bold',
              border: '1px solid black',
            },
          }}
          {...form.getInputProps('code')}
          error={error}
        />
        <div className="text-center mt-4">
          <Button type="submit" uppercase onClick={emailHandler.open}>
            Verify
          </Button>
        </div>
      </form>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};

export const useEmailSentModal = ({ email }: EmailModelProps): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal= (
    <Stack align="center" spacing="sm" className="mb-6">
      <Mail size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} classNames="" className=" font-semibold uppercase">
        Email Sent!
      </Title>
      <Text size="sm" className="text-center w-2/3">
        A password change was requested. An email has been sent on {email}.
      </Text>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
