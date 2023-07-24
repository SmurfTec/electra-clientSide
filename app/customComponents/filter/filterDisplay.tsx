import { Button, Center, Stack, Text, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { LetterX } from 'tabler-icons-react';

type FilterDisplayProps = {
  filter: { id: number; label: string; value: string };
  setState: Dispatch<SetStateAction<Array<{ id: number; label: string; value: string }>>>;
};

export const FilterDisplay = ({ filter, setState }: FilterDisplayProps) => {
  const { classes } = useStyles();
  const handleStateClose = (value: number) => {
    setState((prev)=>prev.filter((item) => item.id !== value));
  };
  return (
    <Stack align="start">
      <Text className="text-base font-medium">{filter?.label}</Text>
      <Center inline className="space-x-2">
        <Button
          classNames={{ root: classes.filterbuttonRoot }}
          className="text-black w-auto"
          rightIcon={<LetterX size={'14px'} />}
          onClick={() => handleStateClose(filter.id)}
        >
          {filter?.value}
        </Button>
      </Center>
    </Stack>
  );
};

const useStyles = createStyles(() => ({
  filterbuttonRoot: {
    padding: 10,
    backgroundColor: 'rgba(222, 222, 222, 0.62)',
    '&:not([data-disabled]):hover': {
      backgroundColor: 'lightgray',
    },
  },
}));
