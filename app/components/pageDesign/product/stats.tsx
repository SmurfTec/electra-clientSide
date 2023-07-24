import { Center, Stack, Text, clsx, createStyles } from '@mantine/core';
import { ArrowDownLeft, ArrowUpRight } from 'tabler-icons-react';

export type ProductStatProps = {
  label: string;
  value?: string;
  difference: number | string;
  price?: string;
  type: 'price' | 'value';
};
export const Stats = ({ label, value, difference, price, type }: ProductStatProps) => {
  const { classes } = useStyles();
  return (
    <Stack className="my-4">
      <Text className="text-sm font-medium">{label}</Text>
      {value && <Text className={clsx('font-bold text-black', classes.value)}>{value}</Text>}
      {price && (
        <Text className={clsx('font-bold text-black', classes.value)}>
          {type === 'price' ? `$` : ''}
          {price}
        </Text>
      )}
      <Center>
        {Number(difference) >= 0 ? (
          <ArrowUpRight color="rgba(60, 130, 214, 1)" />
        ) : (
          <ArrowDownLeft color="rgba(231, 0, 0, 1)" />
        )}
        <Text
          size={12}
          color={Number(difference) >= 0 ? 'rgba(60, 130, 214, 1)' : 'rgba(231, 0, 0, 1)'}
          className={clsx('font-bold', classes.diff)}
        >
          {`${Number(difference) >= 0 ? '+' : '-'}${Number(difference)} % from previous month`}
        </Text>
      </Center>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  value: {
    fontSize: 33,
    [theme.fn.smallerThan(980)]: {
      fontSize: 22,
    },
    [theme.fn.smallerThan(782)]: {
      fontSize: 18,
    },
    [theme.fn.smallerThan(768)]: {
      fontSize: 33,
    },
  },
  diff: {
    fontSize: 12,
    [theme.fn.smallerThan(980)]: {
      fontSize: 8,
    },
    [theme.fn.smallerThan(782)]: {
      fontSize: 6,
    },
    [theme.fn.smallerThan(768)]: {
      fontSize: 12,
    },
  },
}));
