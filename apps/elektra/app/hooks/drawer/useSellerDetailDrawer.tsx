import { Divider, Group, List, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Check, CircleCheck, Search } from 'tabler-icons-react';

export const useSellerDetailDrawer = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <Stack align="stretch" spacing="md" className="mt-6">
      <TextInput
        styles={{ input: { backgroundColor: '#F1F1F1' } }}
        radius={'md'}
        size="xl"
        rightSection={<Search color="#656565" />}
        className="w-full px-2"
        placeholder="Filter Details"
      />
      <div>
        <Title order={5} className="font-medium">
          What accessories are included?
        </Title>
        <Group spacing={10}>
          <CircleCheck size={20} strokeWidth={1} color={'white'} fill="black" />
          <Text size={'sm'}>Charger Cable</Text>
          <CircleCheck size={20} strokeWidth={1} color={'white'} fill="black" />
          <Text size={'sm'}>Original Box</Text>
        </Group>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          Has your item ever been repaired before?
        </Title>
        <Text size={'sm'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tincidunt elit. Nunc euismod odio sit amet
          lorem lobortis, vel lacinia libero tristique. Nunc porttitor arcu accumsan,
        </Text>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          What best describes overall condition of your item?
        </Title>
        <Text size={'md'} color='black' my={10}>
           Great
        </Text>
        <List
          size={'sm'}
          className="space-y-2"
          icon={<Check size={12} />}
          styles={{
            item: {
              color: '#656565',
            },
          }}
        >
          <List.Item>
            Device has signs of heavy use such as deep scratches, dents, scuffs, or excessive scratching
          </List.Item>
          <List.Item>Fully functional with no operational problems</List.Item>
          <List.Item>No chips or cracks in front or back glass</List.Item>
          <List.Item>Above 80 percent battery health with no Service alert in Settings</List.Item>
          <List.Item>All devices must be free of any lock, carrier blacklist, or financial obligations</List.Item>
          <List.Item>Absolutely no Ghost Image</List.Item>
          <List.Item>No LCD or display defects (aftermarket, burns, damage or no display)</List.Item>
        </List>
        <Divider className="mt-2" />
      </div>
      <div>
        <Title order={5} className="font-medium">
          Tell us more about your item?
        </Title>
        <Text size={'sm'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tincidunt elit. Nunc euismod odio sit amet
          lorem lobortis, vel lacinia libero tristique. Nunc porttitor arcu accumsan,
        </Text>
      </div>
    </Stack>
  );
  return [Modal, opened, { open, close }];
};
