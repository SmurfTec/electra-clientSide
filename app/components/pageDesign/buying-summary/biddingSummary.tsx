import { Modal, Only, PencilButton, TransparentButton, useStylesforGlobal } from '@elektra/customComponents';
import { useDiscountModal, useOfferPlaceModal } from '@elektra/hooks';
import { Avatar, Button, Divider, Grid, Group, Text, useMantineTheme } from '@mantine/core';
import { NextLink } from '@mantine/next';

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
  const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal();
  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4', minHeight: '65vh !important', overflowY: 'auto' }}
      className="p-8 rounded-xl space-y-4"
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
      <PositionApart key={1} text={'MARKETPLACE FEE'} number={marketPlaceFee} />
      <PositionApart key={1} text={'SALES TAX (8.025%)'} number={salesTax} />
      <PositionApart key={3} text={'SHIPPING FEE'} number={shippingFee} />
      <PositionApart key={4} text={'DISCOUNT'} number={discount} discount={true} />
      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />
      <PositionApart key={2} text={'TOTAL  PRICE'} number={totalPrice} numberColor={'#3C82D6'} />

      <Grid>
        <Grid.Col span={6}>
          <Modal
            title="Offer Placed!"
            children={OfferPlaceModal}
            onClose={offerPlaceHandler.close}
            open={offerPlaceOpened}
          />
          <Button className="w-full h-14" type="submit" onClick={offerPlaceHandler.open}>
            CONFIRM
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button component={NextLink} href="/product-listing" className="w-full h-14" classNames={{ root: classes.grayButtonRoot }}>
            CANCEL
          </Button>
        </Grid.Col>
      </Grid>

      <Group className="">
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
export function PositionApart({ text, number, discount, numberColor, key }: PositionApartProps) {
  const [discountModal, discountOpened, discountHandler] = useDiscountModal();
  return (
    <Group className="space-x-4" position="apart">
      <Modal title="Discount" children={discountModal} onClose={discountHandler.close} open={discountOpened} />
      <Text className="font-bold uppercase" size="sm">
        {text}
        <Only when={!!discount}>
          <span className="ml-4">
            <TransparentButton label={'+Add Code'} onClick={discountHandler.open} />
          </span>
        </Only>
      </Text>
      <Text className="font-bold" color={numberColor ?? 'black'} size="xl">
        ${number}
      </Text>
    </Group>
  );
}
