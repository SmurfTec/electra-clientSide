import { Button, CloseButton, Group, Text, TextInput } from '@mantine/core';
import { useFocusTrap, useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { Dispatch, SetStateAction } from 'react';
import { Search } from 'tabler-icons-react';

type HeaderSearchProps = {
  close: () => void;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

export const HeaderSearch = ({ close, state, setState }: HeaderSearchProps) => {
  const focusTrapRef = useFocusTrap();
  const matches = useMediaQuery('(min-width: 810px)', false);
  return (
    <Group position="apart" my={15} className="md:px-10 px-4">
      <Text component={NextLink} href="/" color="black" className="hidden md:block font-bold md:ml-3">
        Elektra
      </Text>
      <TextInput
        ref={focusTrapRef}
        icon={<Search size="1.1rem" strokeWidth={1.5} />}
        radius="xl"
        value={state}
        styles={(theme) => ({
          input: {
            paddingRight: 250,
            backgroundColor: 'rgba(17, 17, 17, 1)',
            color: 'white',
            [theme.fn.smallerThan(810)]: {
              paddingRight: 50,
            },
          },
        })}
        onChange={(event) => setState(event.currentTarget.value)}
        color="rgba(238, 238, 238, 1)"
        size={matches ? 'md' : 'sm'}
        rightSection={<CloseButton onClick={close} />}
        rightSectionWidth={42}
      />
      <Button
        onClick={close}
        styles={(theme) => ({
          root: {
            borderRadius: 0,
            [theme.fn.smallerThan(810)]: {
              borderRadius: 30,
            },
          },
        })}
      >
        Cancel
      </Button>
    </Group>
  );
};
