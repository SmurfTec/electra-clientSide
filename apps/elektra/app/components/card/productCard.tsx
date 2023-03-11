import { NextImage, Only, Title } from '@elektra/ui';
import { Badge, Card, createStyles, Group, Image, Paper, Text, useMantineTheme } from '@mantine/core';
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
    marginBottom: theme.spacing.xs,
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'black',
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
  price: number | undefined;
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
  price,
  ...others
}: ProductCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ProductCardProps>) {
  const { classes, cx } = useStyles();
  const linkProps = {
    href: link,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  const theme = useMantineTheme();
  return (
    <Card className={cx(classes.card, className)} {...others}>
      <Card.Section>
        <Paper bg={theme.other.color.productBackground} className="p-12 flex justify-center items-center">
          <Image height={120} width={100} alt={image} src={image} className="h-1/4 w-1/2" />
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

        <Group className="mt-4">
          <div>
            <Text className="text-[#656565]" size={'xs'}>
              Lowest Price
            </Text>
            <Title order={5}>{lowestPrice ? `$${lowestPrice}` : '--'}</Title>
          </div>
          <div>
            <Text className="text-[#656565]" size={'xs'}>
              Highest Price
            </Text>
            <Title className="font-bold" order={5}>
              {highestPrice ? `$${highestPrice}` : '--'}
            </Title>
          </div>
        </Group>
        <Only when={!!price}>
          <div className="mt-6">
            <Title order={6}>
              Used Starting at <span className="font-bold">${price}</span>
            </Title>
          </div>
        </Only>
      </Card.Section>
    </Card>
  );
}
