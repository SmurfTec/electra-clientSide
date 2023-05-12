import { Only } from '@elektra/customComponents';
import { Anchor, Badge, Card, Grid, Group, Image, Paper, Text, Title, clsx, useMantineTheme } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Heart } from 'tabler-icons-react';

export type ProductCardProps = {
  id: number;
  image: string;
  link: string;
  title: string;
  description: string;
  rating?: string;
  wishlist: boolean;
  lowestPrice: number | null;
  highestPrice: number | null;
  price: number | undefined;
};

export function ProductCard({
  id,
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
  const linkProps = {
    href: link,
    rel: 'noopener noreferrer',
  };

  const theme = useMantineTheme();

  return (
    <Card key={id} className={clsx('relative rounded-none', className)} {...others}>
      <Card.Section component={NextLink} href={link}>
        <Paper bg={'#F5F5F5'} className="p-12 flex justify-center items-center">
          <Image height={120} width={100} alt={image} src={image} className="h-1/4 w-1/2" />
        </Paper>
      </Card.Section>

      <Only when={!!rating}>
        <Badge
          className={clsx(
            rating === 'Used' ? `bg-[${'#3C82D6'}]` : `bg-[${theme.colors.dark}]`,
            'absolute text-white pointer-events-none bg-black top-2 right-2'
          )}
        >
          {rating}
        </Badge>
      </Only>
      <Card.Section>
        <Grid align='center'>
          <Grid.Col span={9}>
          <Text
            className={'block text-[13px] md:text-base mt-5 mb-1 font-bold text-black '}
            
            weight={500}
            component={NextLink}
            {...linkProps}
          >
            {title}
          </Text>
          </Grid.Col>
          <Grid.Col span={3}>
          <Heart
            className="cursor-pointer"
            size={23}
            strokeWidth={1.5}
            fill={wishlist ? 'red' : 'white'}
            color={wishlist ? 'red' : undefined}
          />
          </Grid.Col>
          {/* </ActionIcon> */}
        </Grid>

        <Text color={'#B4B4B4'} size="sm" lineClamp={4}>
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
            <Anchor component={NextLink} href="/shop" className='cursor-pointer'>
              <Title order={6}>
                Used Starting at <span className="font-bold">${price}</span>
              </Title>
            </Anchor>
          </div>
        </Only>
      </Card.Section>
    </Card>
  );
}
