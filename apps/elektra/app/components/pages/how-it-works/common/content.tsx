import { NextImage, Text, Title } from '@elektra/ui';
import { SimpleGrid } from '@mantine/core';

type HIWContentProps = {
  image: string;
  title: string;
  content: string;
};

export function HIWContent({ image, content, title }: HIWContentProps) {
  return (
    <div>
      <SimpleGrid cols={2}>
        <div>
          <NextImage alt={image} className="m-0 h-screen" layout="fill" src={image} />
        </div>
        <div>
          <Title order={3}>{title}</Title>
          <Text size="md">{content}</Text>
        </div>
      </SimpleGrid>
    </div>
  );
}
