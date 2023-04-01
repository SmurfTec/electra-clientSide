import { Button, Select, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { CaretDown } from 'tabler-icons-react';

export const useOfferModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      days: '',
    },
  });
  const handleSubmit = (code: string) => {
    console.log(code);
  };
  const Modal = (
    <Stack align="center" spacing="xl" className="mt-6">
      <Text size="sm" className="font-semibold">
        Update Offer Expiration Date
      </Text>
      <form onSubmit={form.onSubmit(({ days }) => handleSubmit(days))}>
        <Select
          className="w-[100%] mr-20"
          size="lg"
          rightSection={<CaretDown fill="black" size="1rem" />}
          rightSectionWidth={30}
          searchable
          nothingFound="No options"
          maxDropdownHeight={130}
          zIndex={10}
          data={['7 Days', '14 Days', '21 Days']}
          styles={{
            input: {
              borderRadius: 'unset',
              border: '1px solid black',
            },
          }}
          {...form.getInputProps('days')}
        />
        <div className="text-center mt-4">
          <Button type="submit" uppercase>
            Add
          </Button>
        </div>
      </form>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
