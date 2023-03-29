import { Button, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { CircleCheck } from 'tabler-icons-react';

export const useRequestItemModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} className=" font-bold">
        Your request was sent!
      </Title>
      <Text size="sm">You will be notified when the product is available on our platform.</Text>
      <Button
        size={'md'}
        variant="outline"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border: '1px solid',
            width: '170px',
          },
        }}
      >
        Explore Products
      </Button>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
