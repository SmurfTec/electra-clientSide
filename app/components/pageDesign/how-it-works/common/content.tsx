import { Grid, Image, useMantineTheme,Title,Text} from '@mantine/core';

type HIWContentProps = {
  image: string;
  title: string;
  content: string;
};

export function HIWContent({ image, content, title }: HIWContentProps) {
  const theme = useMantineTheme();
  return (
    <div className="my-16 mb-[200px]">
      <Grid className='mb-20'>
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
            <Text color={'#B4B4B4'} size="md" mt={10}>
              {content}
            </Text>
            <Text color={'#B4B4B4'} size="md" mt={10}>
              {content}
            </Text>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
