import { Modal as CModal } from '@elektra/customComponents';
import { loadCoupon, useAppDispatch } from '@elektra/store';
import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useRedeemSuccesfullModal } from './useRedeemModal';

export const useDiscountModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const [RedeemSuccessfulModal, openedSuccess, redeemHandler] = useRedeemSuccesfullModal();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      code: '',
    },
    validate: {
      code: (value) => (value.length < 6 ? 'At least 6 digits required' : null),
    },
  });

  const handleSubmit = async (code: string) => {
    setLoading(true);
    const response = await dispatch(loadCoupon(code));
    setLoading(false);
    if (response.isError) {
      form.setErrors({ code: response.errorPayload?.message || 'An unknown error occurred' });
      return;
    }
    close();
    redeemHandler.open();
  };

  const Modal = (
    <Stack align="center" spacing="xl" className="mt-6">
      <Text size="sm" className="font-semibold">
        Add discount codes to get discounts
      </Text>
      <form
        onSubmit={form.onSubmit(async ({ code }) => {
          await handleSubmit(code);
        })}
      >
        <TextInput
          placeholder="code"
          className="w-full"
          size="lg"
          styles={{
            input: {
              borderRadius: 'unset',
              textAlign: 'center',
              color: '#3C82D6',
              fontWeight: 'bold',
              border: '1px solid black',
            },
          }}
          {...form.getInputProps('code')}
        />
        <div className="text-center mt-4">
          <Button type="submit" uppercase loading={loading}>
            Add
          </Button>
        </div>
      </form>
      <CModal
        title="Redeem Successfully"
        children={RedeemSuccessfulModal}
        onClose={redeemHandler.close}
        open={openedSuccess}
      />
    </Stack>
  );

  // Reset form errors when the modal opens
  // open = () => {
  //   form.reset();
  //   redeemHandler.open();
  // };

  return [Modal, opened, { open, close }];
};
