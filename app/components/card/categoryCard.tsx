import { Button, Grid, Image, Paper, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useStylesforGlobal } from '../../customComponents/theme';
// import Image from 'next/image';

type CategoryCardProps = {
  id: number;
  image: string;
  title: string;
  link: string;
};

export function CategoryCard({ id, image, title, link, ...rest }: CategoryCardProps) {
  const { classes } = useStylesforGlobal();
  return (
    <Paper {...rest} className="bg-transparent">
      <Image alt="" src={image} height={200} />
      <Grid align="center" className="bg-transparent mt-4">
        <Grid.Col span={8}>
          <Text className="text-[10px] md:text-base font-semibold text-black">{title}</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Button
            component={NextLink}
            href={link}
            leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
            variant="outline"
            classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
