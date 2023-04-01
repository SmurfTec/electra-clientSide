import { Paper, Text, useMantineTheme } from '@mantine/core';

export type SimpleStatCardProps = {
  title: string;
  value: number;
  type: '%' | '$' | 'N/A';
};

export function SimpleStateCard({ title, value, type }: SimpleStatCardProps) {
  const theme = useMantineTheme();
  const assignValue = () => {
    if (type === '$') return `$ ${value}`;
    if (type === '%') return `${value} %`;
    return value.toString();
  };

  return (
    <Paper withBorder className="p-4" radius={0}>
      <Text color={'#656565'} size="sm">
        {title}
      </Text>
      <Text mt={16} size={32} className="font-bold">
        {assignValue() as string}
      </Text>
    </Paper>
  );
}
