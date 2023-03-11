import { Button, Stack, Text, Title } from '@mantine/core';
import { CircleCheck } from 'tabler-icons-react';

export const ProductAddedModal = () => {
  return (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Title order={4} className=" font-bold">
        Product Added Successfully!
      </Title>
      <Text size="sm">Your item was added to sale list.</Text>
      <Button
        size={'lg'}
        variant='outline'
        className="w-1/3 mt-2"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border:"1px solid"
          },
        }}
      >
        View Product
      </Button>
    </Stack>
  );
};
