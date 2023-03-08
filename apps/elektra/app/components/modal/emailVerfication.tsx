import { Button, NumberInput, Stack, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';

type EmailVerificationModelProps = {
  email: string;
};

export const EmailVerificationModel = ({ email }: EmailVerificationModelProps) => {
  return (
    <Stack align="center" spacing="xl" className="mt-6">
      <Text size="sm" className="font-semibold">
        An email has been sent on {email}
        <br></br>For verification please enter code in the email below
      </Text>
      <NumberInput
        className="w-2/3"
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
      />
      <Button component={NextLink} href='/' uppercase>
        Verify
      </Button>
    </Stack>
  );
};
