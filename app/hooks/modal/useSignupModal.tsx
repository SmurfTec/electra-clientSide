import { Button, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CircleCheck, CircleX } from 'tabler-icons-react';

export const useSignUpSuccesfullModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal= (
    <Stack align="center" spacing='sm' className='mb-6'>
      <CircleCheck size={60} strokeWidth={1} color={'#3C82D6'} />
      <Title order={4} classNames='' className=" font-semibold uppercase">
        SignUp Succesfull
      </Title>
      <Text size='sm'>Redirecting you to homepage be patient.</Text>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
export const useSignUpUnSuccesfullModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" spacing='sm' className='mb-6'>
      <CircleX size={60} strokeWidth={1} color={'red'} />
      <Title order={4} className=" font-semibold uppercase">
        SignUp Failed
      </Title>
      <Text size='sm'>Signup fail please try again</Text>
      <Button size={'lg'} className='w-[80%] mt-5' uppercase>Try Again</Button>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
