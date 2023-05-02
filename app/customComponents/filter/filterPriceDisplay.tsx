import { Button, Center, Stack, Text, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { LetterX } from 'tabler-icons-react';

type FilterDisplayPriceProps = {
  label: string;
  state: Array<number>;
  setState: Dispatch<SetStateAction<Array<number>>>;
};

export const FilterDisplayPrice = ({ label, state, setState }: FilterDisplayPriceProps) => {
  const { classes } = useStyles();
  const handleStateClose = () => {
    setState([]);
  };
  const priceLabel = () => {
    const [l, r] = state;

    return (
      <Center inline>
        <Text className="text-black font-medium" size={15}>
          ${l * 10}
        </Text>
        <Text className="text-black font-medium" size={15}>
          {' '}
          -{' '}
        </Text>
        <Text className="text-black font-medium"  size={15}>
          {r * 10}
        </Text>
      </Center>
    );
  };
  return (
    <>
      {state.length != 0 && (
        <Stack>
          <Text className="text-base font-medium">{label}</Text>
          <Center inline className="space-x-2">
            <Button
              classNames={{ root: classes.filterbuttonRoot }}
              className="text-black w-auto"
              rightIcon={<LetterX size={'14px'} />}
              onClick={handleStateClose}
            >
              {priceLabel()}
            </Button>
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
