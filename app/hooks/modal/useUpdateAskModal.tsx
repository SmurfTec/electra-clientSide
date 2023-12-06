import { ItemCard } from '@elektra/components';
import { HttpStatusCode, baseURL, http } from '@elektra/customComponents';
import { AppDispatch, loadOrderSellingListings, useDispatch } from '@elektra/store';
import { ActionIcon, Button, Center, Divider, Group, NumberInput, Stack, Text } from '@mantine/core';
import { useCounter, useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Minus, Plus } from 'tabler-icons-react';

export const useUpdateAskModal = (
  productDetailData: any
): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const initialCount = productDetailData?.my_offer || 0;
  const [count, handlers] = useCounter(initialCount, { min: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const updateAsk = async (newPrice: number) => {
    setIsLoading(true);
    setError('');
    const payload = {
      price: newPrice,
      product: productDetailData?.product?.id,
    };

    try {
      const response = await http.request({
        url: `/asks/${productDetailData.id}`,
        method: 'PUT',
        data: payload,
      });
      if (response.status === 200) {
        setSuccessMessage('Ask successfully updated');
        setSuccessMessage('Listing successfully updated');
        await dispatch(loadOrderSellingListings());
        close();
      } else {
        setError('Error updating ask');
      }
      setIsLoading(false);
    } catch (error) {
      setError('Failed to update ask');
    }
  };

  const Modal = (
    <Stack align="center" justify="center" px={10} spacing={0} className="mt-4">
      <div className="w-full space-y-5">
        <ItemCard
          // color={productDetailData.color}
          // company={productDetailData.company}
          // image={productDetailData?.image}
          image={`${baseURL}/${productDetailData?.product?.attachments[0].url}`}
          productVariants={[]}
          specs={productDetailData?.product?.specs}
          title={productDetailData?.product.title}
          key={productDetailData?.title + productDetailData?.image}
        />
        <Divider variant="dashed" />
      </div>
      <Text className="text-sm font-medium mt-5">Enter your new ask value:</Text>
      <Group
        position="center"
        spacing={0}
        className="mt-6 py-4 px-8 border-solid border-2 border-black w-full flex justify-between"
      >
        <ActionIcon component="button" size="lg" color="dark" radius={0} variant="filled" onClick={handlers.decrement}>
          <Minus size={16} color="white" />
        </ActionIcon>
        <NumberInput
          hideControls
          value={count}
          maw={150}
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

      {successMessage && (
        <Text size={'sm'} color="green">
          {successMessage}
        </Text>
      )}
      {error && (
        <Text size={'sm'} color="red">
          {error}
        </Text>
      )}
      <Center className="space-x-5 mt-5">
        <Button
          styles={{
            root: {
              width: 140,
            },
          }}
          bg="rgba(222, 222, 222, 1)"
          onClick={close}
        >
          CANCEL
        </Button>
        <Button
          styles={{
            root: {
              width: 140,
            },
          }}
          onClick={() => {
            updateAsk(count);
          }}
          // disabled={isLoading}
          loading={isLoading}
        >
          UPDATE
        </Button>
      </Center>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
