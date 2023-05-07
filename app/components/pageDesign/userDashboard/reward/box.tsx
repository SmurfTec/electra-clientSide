import { Badge, Text, Title } from '@mantine/core';
type BoxProps = {
  label: string;
  title: string;
  description: string;
};
export function Box({ label, title, description }: BoxProps) {
  return (
    <div className="flex flex-row">
      <div className='-mt-2'>
        <Badge size={'xl'} radius={0} color={'black'} variant="filled">
          {label}
        </Badge>
      </div>
      <div className="ml-4 w-full">
        <Title order={5} className="font-bold">
          {title}
        </Title>
        <Text className="w-full mt-1" size={'sm'}>
          {description}
        </Text>
      </div>
    </div>
  );
}
