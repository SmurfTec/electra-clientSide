import { Text, Title, useTheme } from '@elektra/ui';
import { Grid, Image, SimpleGrid } from '@mantine/core';

type HIWContentProps = {
  image: string;
  title: string;
  content: string;
};

export function HIWContent({ image, content, title }: HIWContentProps) {
  const theme = useTheme();
  return (
    <div className="mt-16">
      <Grid
        
      >
        <Grid.Col xs={6}>
        <div className="relative">
          <Image className="md:absolute right-0 -top-8" alt={image} width="80%" src={image} />
        </div>
        </Grid.Col>
        <Grid.Col xs={6}>
        <div>
          <Title order={3} className="font-[500]">
            {title}
          </Title>
          <Text color={theme.other.color.subTitle} size="md" mt={10}>
            {content}
          </Text>
          <Text color={theme.other.color.subTitle} size="md" mt={10}>
            {content}
          </Text>
        </div>
        </Grid.Col>
        
      </Grid>
    </div>
  );
}
