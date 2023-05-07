import { Only } from '@elektra/customComponents';
import { Button, Image, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';

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

  const matches = useMediaQuery('(max-width: 800px)');
  return (
    <div className="relative">
      <Image src={image} alt="banner" height={matches ? 300 : undefined} />
      <div className="absolute bottom-5 sm:bottom-20 xs:20 left-5">
        <Title color={'white'} order={matches ? 5 : 2} transform="uppercase">
          {title}
        </Title>
        <Title color={'white'} order={matches ? 3 : 1} transform="uppercase">
          {heading}
        </Title>
      </div>
      <Only when={!matches}>
        <div className="absolute bottom-5 xs:right-5 left-5 xs:left-auto xs:bottom-10 ">
          <Button
            component={NextLink}
            href={link}
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
      </Only>
    </div>
  );
}
