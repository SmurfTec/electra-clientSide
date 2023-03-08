import { Stack, Text, Title } from '@mantine/core';
import { CircleCheck } from 'tabler-icons-react';

export const SignUpSuccesfullModal = () => {
  return (
    <Stack align="center" spacing='sm' className='mb-6'>
      <CircleCheck size={60} strokeWidth={1} color={'#3C82D6'} />
      <Title order={4} classNames='' className=" font-semibold uppercase">
        SignUp Succesfull
      </Title>
      <Text size='sm'>Redirecting you to homepage be patient.</Text>
    </Stack>
  );
};
