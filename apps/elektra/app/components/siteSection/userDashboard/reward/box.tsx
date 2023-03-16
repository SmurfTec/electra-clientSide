import { Button, Text, Title } from '@mantine/core';
type BoxProps = {
  label: string;
  title: string;
  description: string;
};
export function Box({ label, title, description }: BoxProps) {
  return (
    <div className="flex flex-row">
      <Button
        className="mt-1"
        styles={{
          root: {
            padding: '0px 15px',
            borderRadius: 'unset',
          },
        }}
      >
        {label}
      </Button>
      <div className="ml-3">
        <Title order={5} className="font-bold">
          {title}
        </Title>
        <Text className="w-2/3 mt-1" size={'sm'}>
          {description}
        </Text>
      </div>
    </div>
  );
}
