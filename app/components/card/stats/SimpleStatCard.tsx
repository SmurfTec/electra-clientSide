import { Paper, Text, useMantineTheme } from '@mantine/core';

export type SimpleStatCardProps = {
  title: string;
  value: number;
  type: '%' | '$' | 'N/A';
};

export function SimpleStateCard({ title, value, type }: SimpleStatCardProps) {
  const assignValue = () => {
    if (type === '$') return `$ ${value}`;
    if (type === '%') return `${value} %`;
    return value.toString();
  };

  return (
    <Paper withBorder className="p-4" radius={0}>
      <Text color={'#656565'} className='text-[10px] md:text-sm font-medium'>
        {title}
      </Text>
      <Text mt={16}  className="text-lg md:text-[30px] text-black font-bold">
        {assignValue() as string}
      </Text>
    </Paper>
  );
}
