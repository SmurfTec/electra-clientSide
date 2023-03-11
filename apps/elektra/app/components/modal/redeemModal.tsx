import { Button, Stack, Text, Title } from '@mantine/core';
import { CircleCheck, CircleX } from 'tabler-icons-react';

export const RedeemSuccesfullModal = () => {
  return (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} className=" font-bold">
        Redeemed Successfully!
      </Title>
      <Text size="sm">Now get discount on next item you buy</Text>
      <Button
        size={'lg'}
        variant='outline'
        className="w-5/12"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border:"1px solid"
          },
        }}
      >
        Explore Products
      </Button>
    </Stack>
  );
};

export const RedeemUnSuccesfullModal = () => {
  return (
    <Stack align="center" spacing='sm' className='mb-6'>
      <CircleX size={60} strokeWidth={1} color={'red'} />
      <Title order={4} className=" font-semibold uppercase">
        Redeemed Failed
      </Title>
      <Text size='sm'>Now wiil not get discount on next item you buy</Text>
      <Button
        size={'lg'}
        variant='outline'
        className="w-5/12"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border:"1px solid"
          },
        }}
      >
        Try Again
      </Button>
    </Stack>
  );
};