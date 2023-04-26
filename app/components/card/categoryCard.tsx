import { Button, Group, Image, Paper, Title } from '@mantine/core';
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
      <Image alt="" src={image} />
      <Group position="apart" className="bg-transparent mt-4">
        <Title className="font-[600]" order={5}>
          {title}
        </Title>
        {/* TODO: Not right behavior but make it right way */}
        <div>
          <Button
            component={NextLink}
            href={link}
            leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
            variant="outline"
            classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
          />
        </div>
      </Group>
    </Paper>
  );
}
