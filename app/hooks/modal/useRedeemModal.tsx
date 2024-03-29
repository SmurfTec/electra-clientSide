import { Modal as Mdal, http } from '@elektra/customComponents';
import { RootState, store, updateUserProfile, useAppDispatch, useSelector } from '@elektra/store';
import { ActionIcon, Button, Group, NumberInput, Stack, Text, Title } from '@mantine/core';
import { useCounter, useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import React from 'react';
import { CircleCheck, CircleX, Minus, Plus } from 'tabler-icons-react';

export const useRedeemInputModal = (): [React.ReactNode, number, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [offerModal, offerOpened, offerHandler] = useRedeemSuccesfullModal();
  const [failModal, failOpened, failHandler] = useRedeemUnSuccesfullModal();
  const [count, handlers] = useCounter(profile?.coins, { min: 0 });
  const dispatch = useAppDispatch()

  const handleSubmit = async (coins: number) => {
    const res = await http.request({
      url: '/auth/redeem-coins',
      method: 'PATCH',
      data: {
        coins,
      },
    });

    if (res.isError) {
      failHandler.open();
      return;
    }
    
    offerHandler.open();
    dispatch(updateUserProfile(Number(profile?.id)))
    return;
  };

  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <Mdal children={offerModal} onClose={offerHandler.close} open={offerOpened} />
      <Mdal children={failModal} onClose={failHandler.close} open={failOpened} />

      <Group position="center" spacing={0} className="mt-6">
        <ActionIcon component="button" size="lg" color="dark" radius={0} variant="filled" onClick={handlers.decrement}>
          <Minus size={16} color="white" />
        </ActionIcon>
        <NumberInput
          hideControls
          value={count}
          maw={100}
          onChange={handlers.set}
          styles={{
            input: {
              border: 'unset',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          }}
        />
        <ActionIcon component="button" size="lg" radius={0} color="dark" variant="filled" onClick={handlers.increment}>
          <Plus size={16} color="white" />
        </ActionIcon>
      </Group>
      <Text size={20} className="font-semibold my-3">
        {count} = ${count / 100}
      </Text>
      <Group position="center">
        <Button size={'lg'} uppercase onClick={() => handleSubmit(count)}>
          Redeem
        </Button>
        <Button size={'lg'} color="blue" onClick={() => handleSubmit(Number(profile?.coins) || 0)} uppercase>
          Redeem All
        </Button>
      </Group>
    </Stack>
  );
  return [Modal, count, opened, { open, close }];
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
        component={NextLink}
        href="/shop"
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

export const useRedeemUnSuccesfullModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
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
