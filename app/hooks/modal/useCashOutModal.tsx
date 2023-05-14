import { Button, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { CircleCheck, CircleX } from 'tabler-icons-react';

export const useCashoutSuccessfullModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} className=" font-bold">
        Cashout Successful
      </Title>
      <Text size="sm">Your funds are now in process</Text>
      <Button
        component={NextLink}
        href="/shop"
        size={'lg'}
        variant="outline"
        className="mt-2"
        styles={{
          root: {
            // padding: 'unset',
            borderRadius: '35px',
            border: '1px solid',
          },
        }}
      >
        Explore Products
      </Button>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};

export const useCashoutUnSuccessfullModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleX size={60} strokeWidth={1} color={'red'} />
      <Title order={4} className=" font-bold">
      Cashout Failed
      </Title>
      <Text size="sm">Your funds are not in process.</Text>
      <Button
        component={NextLink}
        href="/shop"
        size={'lg'}
        variant="outline"
        className="w-1/3 mt-2"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border: '1px solid',
          },
        }}
      >
        Try Again
      </Button>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
