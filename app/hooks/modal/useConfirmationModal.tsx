import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CircleCheck } from 'tabler-icons-react';

interface ConfirmationModalOptions {
  highestOffer?: any;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  error: string;
}

export const useConfirmationModal = ({
  highestOffer,
  onConfirm,
  onCancel,
  isLoading,
  error,
}: ConfirmationModalOptions): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <Stack align="center" spacing="sm" className="mb-6">
      <CircleCheck size={60} strokeWidth={1} color={'white'} className="fill-[#3C82D6]" />
      <Text className="font-bold text-black text-base md:text-xl">Are you sure you want to sell this item?</Text>
      <Text size="sm" className="text-sm font-medium">
        {highestOffer ? `Highest Offer: $${highestOffer}` : 'No offers yet'}
      </Text>
      {error && (
        <Text className="text-xs" color="red">
          {error}
        </Text>
      )}
      <div className="flex gap-10">
        <Button onClick={onConfirm} loading={isLoading} size={'lg'} variant="filled">
          Yes
        </Button>
        <Button onClick={onCancel} size={'lg'} variant="outline">
          No
        </Button>
      </div>
    </Stack>
  );

  return [Modal, opened, { open, close }];
};
