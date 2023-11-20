import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CircleCheck } from 'tabler-icons-react';

interface ModalOptions {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export const useInfoModal = ({ title = 'Alert!', description, actions }: ModalOptions = {}): [
  React.ReactNode,
  boolean,
  { open: () => void; close: () => void }
] => {
  const [opened, { open, close }] = useDisclosure(false);
  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Text className="font-bold text-black text-base md:text-xl">{title}</Text>
      <Text size="sm" className="text-sm font-medium">
        {description}
      </Text>
      {actions}
      {/* <Button
        onClick={() => close()}
        size={'lg'}
        variant="outline"
        className="w-1/3 mt-2 text-sm font-medium"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border: '1px solid',
          },
        }}
      >
        Close
      </Button> */}
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
