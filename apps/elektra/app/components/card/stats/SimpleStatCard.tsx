import { Text, Title, useMantineTheme } from '@mantine/core';

export type SimpleStatCardProps = {
  title: string;
  value: number;
  type: '%' | '$' | 'N/A';
};

export function SimpleStateCard({ title, value, type }: SimpleStatCardProps) {
  const theme = useMantineTheme()
  const assignValue = () => {
    if (type === '$') return `$ ${value}`;
    if (type === '%') return `${value} %`;
    return value.toString();
  };

  const amount: string = assignValue();
  return (
    <div className="p-4" style={{ border: '1px solid', borderColor: 'rgba(101, 101, 101, 0.29)' }}>
      <Text color={theme.other.color.tabTitle} size="sm">{title}</Text>
      <Title  mt={16} className="font-bold" order={3}>
        {amount}
      </Title>
    </div>
  );
}
