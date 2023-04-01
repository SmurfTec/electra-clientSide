import { Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const useTechinalSpecificationDrawer = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <Stack align="stretch" spacing="xl" className="mt-6">
      <TextInput
        styles={{ input: { backgroundColor: '#F1F1F1' } }}
        radius={'md'}
        size="xl"
        className="w-full px-2"
        placeholder="Filter Specification"
      />
      <div>
        <Title order={5} className="font-medium">
          MPN
        </Title>
        <Text size={'sm'} >
          535MWRL4355
        </Text>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          Storage
        </Title>
        <Text size={'sm'} >
          128 GB
        </Text>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          Model No
        </Title>
        <Text size={'sm'} >
          43GG
        </Text>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          Release Date
        </Title>
        <Text size={'sm'} >
          20 Aug 2022
        </Text>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          RAM
        </Title>
        <Text size={'sm'} >
          8GB
        </Text>
      </div>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
