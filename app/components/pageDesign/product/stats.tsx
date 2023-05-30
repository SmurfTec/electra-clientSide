import { Center, Stack, Text, clsx, createStyles } from '@mantine/core';
import { ArrowDownLeft, ArrowUpRight } from 'tabler-icons-react';

type StateProps = {
  label: string;
  value?: string ;
  difference: number;
  price?: string ;
};
export const Stats = ({ label, value, difference, price }: StateProps) => {
  
  const { classes } = useStyles();
  return (
    <Stack className='my-4' >
      <Text className="text-sm font-medium">{label}</Text>
      {value && (
        <Text className={clsx("font-bold text-black",classes.value)}>
          {value}
        </Text>
      )}
      {price && (
        <Text  className={clsx("font-bold text-black",classes.value)}>
          ${price}
        </Text>
      )}
      <Center>
        {difference >= 0 ? <ArrowUpRight color='rgba(60, 130, 214, 1)' /> : <ArrowDownLeft color='rgba(231, 0, 0, 1)' />}
        <Text size={12} color={difference >= 0 ? 'rgba(60, 130, 214, 1)' : 'rgba(231, 0, 0, 1)'} className={clsx("font-bold",classes.diff)}>
          {`${difference >= 0 ? '+' : '-'}${difference} % from previous month`}
        </Text>
      </Center>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  value: {
    fontSize:33,
    [theme.fn.smallerThan(980)]: {
      fontSize:22,
    },
    [theme.fn.smallerThan(782)]: {
      fontSize:18,
    },
    [theme.fn.smallerThan(768)]: {
      fontSize:33,
    },
  },
  diff: {
    fontSize:12,
    [theme.fn.smallerThan(980)]: {
      fontSize:8,
    },
    [theme.fn.smallerThan(782)]: {
      fontSize:6,
    },
    [theme.fn.smallerThan(768)]: {
      fontSize:12,
    },
  },

}));