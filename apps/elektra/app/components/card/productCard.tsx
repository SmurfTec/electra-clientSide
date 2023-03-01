import { NextImage, Only, Title, useTheme } from '@elektra/ui';
import { Badge, Card, createStyles, Group, Image, Paper, Text } from '@mantine/core';
import { Heart } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    borderRadius: '0',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
    backgroundColor: 'black',
    color: 'white',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
    fontSize: "16px",
    fontWeight: "bold",
    color: "black"
  },

  action: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

type ProductCardProps = {
  image: string;
  link: string;
  title: string;
  description: string;
  rating: string;
  wishlist: boolean;
  lowestPrice: number | null;
  highestPrice: number | null;
};

export function ProductCard({
  className,
  image,
  link,
  title,
  description,
  wishlist,
  rating,
  lowestPrice,
  highestPrice,
  ...others
}: ProductCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ProductCardProps>) {
  const { classes, cx } = useStyles();
  const linkProps = {
    href: link,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  const theme = useTheme()
  return (
    <Card className={cx(classes.card, className)} {...others}>
      <Card.Section>

        <Paper bg={theme.other.color.productBackground} className="p-20 flex justify-center items-center">
          <NextImage height={120} width={100} alt={image} src={image} className="h-2/4 w-2/4" />
        </Paper>
      </Card.Section>

      <Only when={!!rating}>
        <Badge className={classes.rating}>{rating}</Badge>
      </Only>
      <Card.Section>
        <Group position="apart">
          <Text className={classes.title} weight={500} component="a" {...linkProps}>
            {title}
          </Text>
          <Heart
            className="cursor-pointer"
            size={23}
            strokeWidth={1.5}
            fill={wishlist ? 'red' : 'white'}
            color={wishlist ? 'red' : undefined}
          />
          {/* </ActionIcon> */}
        </Group>

        <Text color={theme.other.color.subTitle} size="sm" lineClamp={4}>
          Condition : {description}
        </Text>

        <Group className='mt-4'>
          <div>
            <Text className='text-[#656565]' size={"xs"}>Lowest Price</Text>
            <Title order={5}>{lowestPrice ? `$${lowestPrice}` : "--"}</Title>
          </div>
          <div>
          <Text className='text-[#656565]' size={"xs"}>Highest Price</Text>
            <Title className='font-bold' order={5}>{highestPrice ? `$${highestPrice}` : "--"}</Title>
          </div>
        </Group>  
      </Card.Section>
    </Card>
  );
}
