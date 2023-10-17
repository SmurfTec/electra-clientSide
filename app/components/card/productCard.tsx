import { Only } from '@elektra/customComponents';
import { likeProduct, removeFavourite, store, UnlikeProduct } from '@elektra/store';
import { Anchor, Badge, Card, clsx, Grid, Group, Image, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Heart } from 'tabler-icons-react';

export type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  condition: 'used' | 'new';
  wishlist: boolean | undefined;
  lowestPrice: number | null;
  highestPrice: number | null;
  price: number | undefined;
  usedPrice?: number | null;
  onClick?: () => void;
  isWishlist?: boolean | undefined;
  product?:any;
};

export function ProductCard({
  id,
  image,
  title,
  description,
  wishlist,
  usedPrice,
  condition = 'new',
  lowestPrice,
  highestPrice,
  price,
  onClick,
  isWishlist,
  product
}: ProductCardProps) {
  const theme = useMantineTheme();
  const phone = useMediaQuery('(max-width: 600px)');
  const router = useRouter();
  const [isLike, setIsLike] = useState(wishlist);

  return (
    <Card className="relative rounded-none">
      <Anchor
        onClick={() => router.push(condition === 'new' ? `/product-detail/${id}` : `/product-detail/listing/${id}`)}
        className="cursor-pointer"
        align="unset"
        underline={false}
      >
        <Card.Section>
          {/* <Paper bg={'#F5F5F5'} className="flex items-center justify-center p-6"> */}
          <Paper className="flex items-center justify-center">
            <Image alt={image} src={image} fit="cover" height={'200px'} />
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
          <Grid.Col
            onClick={() => router.push(condition === 'new' ? `/product-detail/${id}` : `/product-detail/listing/${id}`)}
            span={9}
            px={0}
          >
            <Text className="block text-[13px] md:text-base font-bold text-black " weight={500}>
              {title}
            </Text>
          </Grid.Col>
          <Only when={wishlist !== undefined}>
            <Grid.Col className="text-right" px={0} span={3}>
              <Heart
                className="cursor-pointer"
                size={23}
                onClick={() => {
                  isLike
                  ? store.dispatch(UnlikeProduct(condition === 'new' ? { product: id } : { listing: id }))
                  : store.dispatch(likeProduct(condition === 'new' ? { product: id } : { listing: id }));
                  
                  onClick && onClick();
                  !isWishlist && setIsLike(!isLike);
                }}
                strokeWidth={1.5}
                fill={isLike ? 'red' : 'white'}
                color={isLike ? 'red' : undefined}
              />
            </Grid.Col>
          </Only>
          {/* </ActionIcon> */}
        </Grid>
        <Anchor
          onClick={() => router.push(condition === 'new' ? `/product-detail/${id}` : `/product-detail/listing/${id}`)}
          className="cursor-pointer"
          underline={false}
        >
          <Text color={'#B4B4B4'} size="sm" lineClamp={4}>
            Condition : {condition ?? 'Used'}
          </Text>
          <Group className="mt-4">
            <div className="max-w-[30%]">
              <Text className="text-[#656565]" size={'xs'}>
              {condition=="new"?"Lowest Ask":"Lowest Price"}  
              </Text>
              <Title order={6}>
               
                {lowestPrice ? `$${usedPrice}` : '$0'}</Title>
            </div>
            <div className="max-w-[30%]">
              <Text className="text-[#656565]" size={'xs'}>
                Highest Offer
              </Text>
              <Title className="font-bold" order={6}>
                {highestPrice ? `$${highestPrice}` : '$0'}
              </Title>
            </div>
          </Group>
          <Only when={!!usedPrice}>
            <div className="mt-6">
              <Text className="no-underline text-[11px] font-medium">
                Used Starting at <span className="font-bold text-black">${usedPrice}</span>
              </Text>
            </div>
          </Only>
        </Anchor>
      </Card.Section>
    </Card>
  );
}
