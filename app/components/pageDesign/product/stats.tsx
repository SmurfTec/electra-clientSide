import { Center, Stack, Text } from '@mantine/core';
import { ArrowDownLeft, ArrowUpRight } from 'tabler-icons-react';

type StateProps = {
  label: string;
  value?: number;
  difference: number;
  price?: number;
};
export const Stats = ({ label, value, difference, price }: StateProps) => {
  return (
    <Stack>
      <Text className="text-sm font-medium">{label}</Text>
      {value && (
        <Text size={40} className="font-bold text-black">
          {value}
        </Text>
      )}
      {price && (
        <Text size={40} className="font-bold text-black">
          ${price}
        </Text>
      )}
      <Center inline>
        {difference >= 0 ? <ArrowUpRight color='rgba(60, 130, 214, 1)' /> : <ArrowDownLeft color='rgba(231, 0, 0, 1)' />}
        <Text size={20} color={difference >= 0 ? 'rgba(60, 130, 214, 1)' : 'rgba(231, 0, 0, 1)'} className="font-bold">
          {`${difference >= 0 ? '+' : '-'}${difference} % from previous month`}
        </Text>
      </Center>
    </Stack>
  );
};
