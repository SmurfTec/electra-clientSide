import { Button, Image, Title, useMantineTheme } from '@mantine/core';

export type BannerProps = {
  id: number;
  image: string;
  link: string;
  title: string;
  heading: string;
  label: string;
};

export function Banner({ id, image, link, title, heading, label }: BannerProps) {
  const theme = useMantineTheme();
  return (
    <div className="relative">
      <Image src={image} />
      <div className="absolute bottom-10 left-5">
        <Title color={'white'} order={3} transform="uppercase">
          {title}
        </Title>
        <Title color={'white'} order={1} transform="uppercase">
          {heading}
        </Title>
      </div>
      <div className="absolute bottom-10 right-5">
        <Button
          uppercase
          size="lg"
          bg={'white'}
          styles={{
            label: {
              fontWeight: 'lighter',
              color: 'black',
            },
            root: {
              '&:hover': {
                backgroundColor: 'white !important',
              },
            },
          }}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
