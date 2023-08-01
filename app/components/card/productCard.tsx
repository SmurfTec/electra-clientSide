import { Only } from '@elektra/customComponents';
import { Anchor, Badge, Card, Grid, Group, Image, Paper, Text, Title, clsx, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Heart } from 'tabler-icons-react';

export type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  condition: 'used' | 'new';
  wishlist: boolean;
  lowestPrice: number | null;
  highestPrice: number | null;
  price: number | undefined;
};

export function ProductCard({
  id,
  image,
  title,
  description,
  wishlist,
  condition = 'new',
  lowestPrice,
  highestPrice,
  price,
}: ProductCardProps) {
  const theme = useMantineTheme();
  const phone = useMediaQuery('(max-width: 600px)');
  const router = useRouter();

  console.log(condition);
  return (
    <Card
      onClick={() => router.push(condition === 'new' ? `/product-detail/${id}` : `/product-detail/listing/${id}`)}
      className="relative rounded-none"
    >
      <Anchor className="cursor-pointer" align="unset" underline={false}>
        <Card.Section>
          {/* <Paper bg={'#F5F5F5'} className="p-6 flex justify-center items-center"> */}
          <Paper className="flex justify-center items-center">
            <Image  alt={image} src={image} className="h-1/4 w-1/2" />
          </Paper>
        </Card.Section>
        <Only when={!!condition}>
          <Badge
            size={phone ? 'sm' : 'md'}
            className={clsx(
              condition === 'used' ? `bg-[${'#3C82D6'}]` : `bg-[${theme.colors.dark}]`,
              'absolute text-white pointer-events-none  bg-black top-6 right-2'
            )}
          >
            {condition}
          </Badge>
        </Only>
      </Anchor>
      <Card.Section className="no-underline">
        <Grid align="center">
          <Grid.Col span={9} px={0}>
            <Text className="block text-[13px] md:text-base font-bold text-black " weight={500}>
              {title}
            </Text>
          </Grid.Col>
          <Grid.Col className="text-right" px={0} span={3}>
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
        <Anchor className="cursor-pointer" underline={false}>
          <Text color={'#B4B4B4'} size="sm" lineClamp={4}>
            Condition : {condition ?? 'Used'}
          </Text>
          <Group className="mt-4">
            <div className="max-w-[30%]">
              <Text className="text-[#656565]" size={'xs'}>
                Lowest Price
              </Text>
              <Title order={6}>{lowestPrice ? `$${lowestPrice}` : '--'}</Title>
            </div>
            <div className="max-w-[30%]">
              <Text className="text-[#656565]" size={'xs'}>
                Highest Price
              </Text>
              <Title className="font-bold" order={6}>
                {highestPrice ? `$${highestPrice}` : '--'}
              </Title>
            </div>
          </Group>
          <Only when={!!price}>
            <div className="mt-6">
              <Text className="no-underline text-[11px] font-medium">
                Used Starting at <span className="font-bold text-black">${price}</span>
              </Text>
            </div>
          </Only>
        </Anchor>
      </Card.Section>
    </Card>
  );
}
