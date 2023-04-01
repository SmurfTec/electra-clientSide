import { Button, Group, Paper, Title } from '@mantine/core';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useStylesforGlobal } from '../../customComponents/theme';
import Image from 'next/image';

type CategoryCardProps = {
  id: number;
  image: string;
  title: string;
  link: string;
};

export function CategoryCard({ id, image, title, link ,...rest }: CategoryCardProps) {
  const { classes } = useStylesforGlobal();
  return (
    <Paper {...rest}>
      <Image src={image} height="250px" width="250px" />
      <Group position="apart">
        <Title className="font-[600]" order={5}>
          {title}
        </Title>
        {/* TODO: Not right behavior but make it right way */}
        <div className="contents">
          {/* <Button
            className="rounded-3xl px-4 h-7"
            styles={{
              root: {
                '&:not([data-disabled]):hover': {
                  backgroundColor: "#3C82D6",
                  borderColor: "#3C82D6",
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
          /> */}
          <Button
            leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
            variant="outline"
            classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
          />
        </div>
      </Group>
    </Paper>
  );
}
