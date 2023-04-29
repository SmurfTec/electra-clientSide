import { ActionIcon, Button, CloseButton, Group, Text, TextInput } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Search } from 'tabler-icons-react';

type HeaderSearchProps = {
  close: () => void;
};

export const HeaderSearch = ({ close }: HeaderSearchProps) => {
  return (
    <Group position="apart" my={15}>
      <Text component={NextLink} href="/" color="black" className="font-bold ml-6 md:ml-3">
        Elektra
      </Text>
      <TextInput
        icon={<Search size="1.1rem" strokeWidth={1.5} />}
        radius="xl"
        color="rgba(238, 238, 238, 1)"
        size="md"
        rightSection={
          <ActionIcon radius={25} onClick={close}>
            <CloseButton />
          </ActionIcon>
        }
        rightSectionWidth={42}
      />
      <Button onClick={close}>Cancel</Button>
    </Group>
  );
};
