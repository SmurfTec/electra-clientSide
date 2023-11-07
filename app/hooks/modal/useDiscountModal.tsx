import { Modal as CModal } from '@elektra/customComponents';
import { loadCoupon, useAppDispatch } from '@elektra/store';
import { Button, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useRedeemSuccesfullModal } from './useRedeemModal';

export const useDiscountModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [RedeemSuccessfulModal, openedSuccess, redeemHandler] = useRedeemSuccesfullModal();

  const form = useForm({
    initialValues: {
      code: '',
    },
    validate: {
      code: (value) => (value.length < 6 ? 'atleast 6 digit' : null),
    },
  });
  const handleSubmit = async (code: string) => {
    const response = await dispatch(loadCoupon(code));
    if (response.isError) {
      // Assuming errorPayload is the correct key based on your console.log
      // Change to the actual key if different
      setErrorMessage(response.errorPayload?.message || 'An unknown error occurred');
      return;
    }
    setErrorMessage(null);
    close();
    redeemHandler.open();
  };
  const Modal = (
    <Stack align="center" spacing="xl" className="mt-6">
      {errorMessage === null && (
        <Text size="sm" className="font-semibold">
          Add discount codes to get discounts
        </Text>
      )}
      {errorMessage && (
        <Text size="sm" className="font-semibold" color="red">
          {errorMessage} {/* Display the error message from the state */}
        </Text>
      )}
      <form
        onSubmit={form.onSubmit(({ code }) => {
          handleSubmit(code);
        })}
      >
        <TextInput
          placeholder="code"
          className="w-[100%] mr-20"
          size="lg"
          min={0}
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
          error={error}
        />
        <div className="text-center mt-4">
          <Button type="submit" uppercase>
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
  return [Modal, opened, { open, close }];
};
