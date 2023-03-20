import { Only } from '@elektra/ui';
import { Avatar, Button, Divider, Grid, Radio, Text } from '@mantine/core';
import { Group, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { CircleCheck, Pencil } from 'tabler-icons-react';
import { PencilButton } from '../../buttons';
import { useStylesforGlobal } from '../../theme';

export type BiddingSummaryProps = {
  yourOffer?: number;
  itemPrice?: number;
  marketPlaceFee: number;
  salesTax: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
};

export function BiddingSummary({
  yourOffer,
  itemPrice,
  marketPlaceFee,
  salesTax,
  shippingFee,
  discount,
  totalPrice,
}: BiddingSummaryProps) {
  const theme = useMantineTheme();
  const { classes } = useStylesforGlobal();
  return (
    <div
      style={{ border: '1px solid', borderColor: theme.other.color.borderColor! }}
      className="p-8 rounded-xl space-y-2"
    >
      <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          {yourOffer ? 'Your Offer' : 'Item Price'}
          <PencilButton />
        </Text>
        <Text className="font-bold" size="xl">
          ${yourOffer ?? itemPrice}
        </Text>
      </Group>

      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />

      <PositionApart key={0} text={'MarketPlace Fee (7.5%)'} number={marketPlaceFee} />
      <PositionApart key={1} text={'SALES TAX (8.025%)'} number={salesTax} />
      <PositionApart key={3} text={'SHIPPING FEE'} number={shippingFee} />
      <PositionApart key={4} text={'DISCOUNT'} number={discount} discount={true} />
      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />
      <PositionApart key={2} text={'TOTAL  PRICE'} number={totalPrice} numberColor={theme.other.color.secondary} />

      <Grid>
        <Grid.Col span={6}>
          <Button className="w-full h-14" type="submit">
            CONFIRM
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button className="w-full h-14" classNames={{ root: classes.grayButtonRoot }}>
            CANCEL
          </Button>
        </Grid.Col>
      </Grid>

      <Group className='pt-6'>
        <Avatar src="images/coin.png" size={'xs'} radius="lg" />
        <Text className="font-bold uppercase" size="sm">
          earn 1500 points for this purchase
        </Text>
      </Group>
    </div>
  );
}

type PositionApartProps = {
  text: string;
  number: number;
  numberColor?: string;
  discount?: boolean;
  key: number;
};
function PositionApart({ text, number,discount, numberColor, key }: PositionApartProps) {
  const theme = useMantineTheme();
  return (
    <Group key={key} className="space-x-4" position="apart">
      <Text className="font-bold uppercase" size="sm">
        {text}
        <Only when={discount}>
        <Button variant="outline" className="font-bold rounded-2xl ml-4" px="20" h={25}>
              +Add Code
            </Button>
        </Only>
      </Text>
      <Text className="font-bold" color={numberColor ?? 'black'} size="xl">
        ${number}
      </Text>
    </Group>
  );
}
