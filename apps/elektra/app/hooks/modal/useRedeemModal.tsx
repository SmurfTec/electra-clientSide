import { ActionIcon, Button, Group, Stack, Text, Title } from '@mantine/core';
import { useCounter, useDisclosure } from '@mantine/hooks';
import React from 'react';
import { CircleCheck, CircleX, Minus, Plus } from 'tabler-icons-react';

export const useRedeemInputModal = ():[React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const [count, handlers] = useCounter(0, { min: 0 });
  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <Group position="center" spacing={35} className="mt-6">
        <ActionIcon component="button" size="lg" color="dark" radius={0} variant="filled" onClick={handlers.decrement}>
          <Minus size={16} color="white" />
        </ActionIcon>
        <Text>{count}</Text>
        <ActionIcon component="button" size="lg" radius={0} color="dark" variant="filled" onClick={handlers.increment}>
          <Plus size={16} color="white" />
        </ActionIcon>
      </Group>
      <Text size={20}>
        {count} = ${count / 100}
      </Text>
      <Group position="center">
        <Button size={'md'} uppercase>
          Redeem
        </Button>
        <Button size={'md'} color="blue" uppercase>
          Redeem All
        </Button>
      </Group>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};

export const useRedeemSuccesfullModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} className=" font-bold">
        Redeemed Successfully!
      </Title>
      <Text size="sm">Now get discount on next item you buy</Text>
      <Button
        size={'lg'}
        variant="outline"
        className="w-5/12"
        styles={{
          root: {
            padding: 'unset',
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

export const useRedeemUnSuccesfullModal = ():[React.ReactNode, boolean, { open: () => void; close: () => void }]  => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleX size={60} strokeWidth={1} color={'red'} />
      <Title order={4} className=" font-semibold uppercase">
        Redeemed Failed
      </Title>
      <Text size="sm">Now wiil not get discount on next item you buy</Text>
      <Button
        size={'lg'}
        variant="outline"
        className="w-5/12"
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
