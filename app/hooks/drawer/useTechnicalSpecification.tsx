import { RootState } from '@elektra/store';
import { Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';

export const useTechinalSpecificationDrawer = (): [
  React.ReactNode,
  boolean,
  { open: () => void; close: () => void }
] => {
  const [opened, { open, close }] = useDisclosure(false);
  const technicalSpecification = useSelector(
    (state: RootState) => state.entities.productDetail.list.product.technical_specifications
  );
  const Modal = (
    <Stack align="stretch" spacing="xl" className="mt-6">
      <TextInput
        styles={{ input: { backgroundColor: '#F1F1F1' } }}
        radius={'md'}
        size="xl"
        className="w-full px-2"
        placeholder="Filter Specification"
      />
      {technicalSpecification.map((item, key) => {
        return (
          <div key={key + item.title}>
            <Title order={5} className="font-medium">
              {item.title}
            </Title>
            <Text size={'sm'}>{item.value}</Text>
            <Divider className="mt-2" />
          </div>
        );
      })}
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
