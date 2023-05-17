import { Button, CloseButton, Group, Text, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { Dispatch, SetStateAction } from 'react';
import { Search } from 'tabler-icons-react';

type HeaderSearchProps = {
  close: () => void;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

export const HeaderSearch = ({ close, state, setState }: HeaderSearchProps) => {
  const matches = useMediaQuery('(min-width: 810px)', false);
  return (
    <Group position="apart" my={15} className="md:px-10 px-4">
      <Text component={NextLink} href="/" color="black" className="hidden md:block font-bold md:ml-3">
        Elektra
      </Text>
      <TextInput
        icon={<Search size="1.1rem" strokeWidth={1.5} />}
        radius="xl"
        value={state}
        onChange={(event) => setState(event.currentTarget.value)}
        color="rgba(238, 238, 238, 1)"
        size={matches ? 'md' : 'sm'}
        rightSection={<CloseButton onClick={close} />}
        rightSectionWidth={42}
      />
      <Button
        onClick={close}
        styles={{
          root: {
            borderRadius: 30,
          },
        }}
      >
        Cancel
      </Button>
    </Group>
  );
};
