import { Text, Title } from '@mantine/core';

type TitleHandProps = {
  title: string;
  description: string;
};

export const TitleHead = ({ title, description }: TitleHandProps) => {
  return (
    <div>
      <Title order={4} className="font-bold" color="black">
        {title}
      </Title>
      <Text size="md" className="font-bold" color="#B4B4B4">
        {description}
      </Text>
    </div>
  );
};
