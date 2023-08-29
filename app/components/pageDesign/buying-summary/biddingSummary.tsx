import { Modal, Only, PencilButton, TransparentButton, useStylesforGlobal } from '@elektra/customComponents';
import { useDiscountModal } from '@elektra/hooks';
import { RootState } from '@elektra/store';
import { Avatar, Button, Divider, Grid, Group, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export type BiddingSummaryProps = {
  itemPrice?: number;
  marketPlaceFee: number;
  salesTax: number;
  shippingFee: number;
  totalPrice: number;
  disabled?: boolean;
  protectionPlan?: string;
  onClick?: () => void;
  reciptFee: Array<{ id: number; fees: number; title: string }>;
};

export function BiddingSummary({
  itemPrice,

  totalPrice,
  disabled,
  protectionPlan,
  onClick,
  reciptFee,
}: BiddingSummaryProps) {
  const router = useRouter();
  const discount = useSelector((state: RootState) => state.entities.coupon.list.discount) ?? 0;
  const isOfferType = router.query.orderType === 'placeOffer';
  const { classes } = useStylesforGlobal();
  const yourOffer = router.query.bidPrice;
  // const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal();
  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4', overflowY: "scroll" }}
      className="p-8 rounded-xl space-y-3 h-full md:absolute md:h-full md:w-full"
    >
      <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          {isOfferType ? 'Your Offer' : 'Item Price'}
          <Only when={!disabled}>
            <PencilButton />
          </Only>
        </Text>
        <Text className="font-bold" color="black" size="xl">
          ${isOfferType ? yourOffer : itemPrice}
        </Text>
      </Group>

      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />
      {reciptFee?.map((item, index) => (
        <PositionApart key={index + item.id} text={item.title} number={item.fees} />
      ))}
      <Only when={!disabled}>
        <PositionApart text={'DISCOUNT'} number={Number(discount)} discount={true} />
        <PositionApart text={'TOTAL PRICE'} number={Number(totalPrice) - Number(discount)} numberColor={'#3C82D6'} />
      </Only>
      <Only when={!disabled}>
        <Grid>
          <Grid.Col span={6}>
            {/* <Modal
              title={isBuying ? 'Product Purchased' : 'Offer Placed!'}
              children={OfferPlaceModal}
              onClose={offerPlaceHandler.close}
              open={offerPlaceOpened}
            /> */}

            <Button
              className="w-full h-14"
              type="submit"
              onClick={() => {
                if (onClick) onClick();
              }}
            >
              CONFIRM
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              component={NextLink}
              href="/product-listing"
              className="w-full h-14"
              classNames={{ root: classes.grayButtonRoot }}
            >
              CANCEL
            </Button>
          </Grid.Col>
        </Grid>
      </Only>

      <Only when={!disabled}>
        <Grid>
          <Grid.Col span={1}>
            <Avatar src="images/coin.png" size={20} radius="lg" />
          </Grid.Col>
          <Grid.Col span={11} className="text-left">
            <Text className="font-bold uppercase" size="sm">
              earn {(totalPrice * 0.01).toFixed()} points for this purchase
            </Text>
          </Grid.Col>
        </Grid>
      </Only>
    </div>
  );
}

type PositionApartProps = {
  text: string;
  number: number;
  numberColor?: string;
  discount?: boolean;
};
export function PositionApart({ text, number, discount, numberColor }: PositionApartProps) {
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
