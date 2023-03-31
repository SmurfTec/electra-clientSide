import { ListItem } from '@elektra/customComponents';
import { Divider, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Check, CircleCheck, Search } from 'tabler-icons-react';

const description = [
  'Device has signs of heavy use such as deep scratches, dents, scuffs, or excessive scratching',
  'Fully functional with no operational problems',
  'No chips or cracks in front or back glass',
  'Above 80 percent battery health with no Service alert in Settings',
  'All devices must be free of any lock, carrier blacklist, or financial obligations',
  'Absolutely no Ghost Image',
  'No LCD or display defects (aftermarket, burns, damage or no display)',
];
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
        <Divider mt={15} />
      </div>
      <div>
        <Title order={5} className="font-medium">
          Has your item ever been repaired before?
        </Title>
        <Text size={'sm'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tincidunt elit. Nunc euismod odio sit amet
          lorem lobortis, vel lacinia libero tristique. Nunc porttitor arcu accumsan,
        </Text>
        <Divider mt={15} />
      </div>
      <div>
        <Title order={5} className="font-medium">
          What best describes overall condition of your item?
        </Title>
        <Text size={'md'} color="black" my={10}>
          Great
        </Text>
        <ListItem
          data={description}
          size={'sm'}
          className="space-y-2"
          icon={<Check size={12} />}
          styles={{ item: { color: '#656565' } }}
        />
        <Divider mt={15} />
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
