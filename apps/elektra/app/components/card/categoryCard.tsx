import { NextImage } from '@elektra/ui';
import { ActionIcon, Button, Group, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';
import { ArrowNarrowRight, Heart } from 'tabler-icons-react';

type CategoryCardProps = {
  id: number;
  image: string;
  title: string;
  link: string;
};

export function CategoryCard({ id, image, title, link }: CategoryCardProps) {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  return (
    <Paper className="">
      <NextImage src={image} height="250px" width="250px" />
      <Group position="apart">
        <Title className="font-[600]" order={5}>
          {title}
        </Title>
        {/* TODO: Not right behavior but make it right way */}
        <div className="contents" ref={ref}>
          <Button
            className="rounded-3xl px-4 h-7"
            styles={{
              root: {
                '&:not([data-disabled]):hover': {
                  backgroundColor: theme.other.color.secondary,
                  borderColor: theme.other.color.secondary,
                },
              },
              rightIcon: {
                color: hovered ? 'white' : 'black',
                marginLeft: 0,
              },
            }}
            rightIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
            variant="outline"
            component={NextLink}
            href={link}
          />
        </div>

        {/* <Button
          className="rounded-3xl px-10 h-12"
          styles={{
            root: {
              '&:hover': {
                backgroundColor: theme.other.color.secondary,
                borderColor: theme.other.color.secondary,
              },
            },
          }}
          variant="outline"
          component={NextLink}
          href={link}
        >
          <ArrowNarrowRight size={30} strokeWidth={1} />
        </Button> */}
      </Group>
    </Paper>
  );
}
