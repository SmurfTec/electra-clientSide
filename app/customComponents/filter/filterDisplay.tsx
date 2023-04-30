import { Button, Center, Stack, Text, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { LetterX } from 'tabler-icons-react';

type FilterDisplayProps = {
  label: string;
  state: Array<string>;
  setState: Dispatch<SetStateAction<Array<string>>>;
};

export const FilterDisplay = ({ label, state, setState }: FilterDisplayProps) => {
  const { classes } = useStyles();
  const handleStateClose = (value: string) => {
    setState(state.filter((item) => item !== value));
  };
  return (
    <>
      {state.length != 0 && (
        <Stack>
          <Text className="text-base font-medium">{label}</Text>
          <Center inline className="space-x-2">
            {state.map((item) => (
              <Button
                classNames={{ root: classes.filterbuttonRoot }}
                className="text-black w-auto"
                rightIcon={<LetterX size={'14px'} />}
                onClick={() => handleStateClose(item)}
              >
                {item}
              </Button>
            ))}
          </Center>
        </Stack>
      )}
    </>
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
