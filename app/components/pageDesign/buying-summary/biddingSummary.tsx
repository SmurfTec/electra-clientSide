import { Modal, Only, PencilButton, TransparentButton, useStylesforGlobal } from '@elektra/customComponents';
import { useDiscountModal } from '@elektra/hooks';
import { RootState } from '@elektra/store';
import { Avatar, Button, Divider, Grid, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export type BiddingSummaryProps = {
  itemPrice?: number;
  totalPrice: number;
  disabled?: boolean;
  protectionPlan?: string;
  onClick?: () => void;
  reciptFee: Array<{ id: number; fees: number; title: string, value_type?: string }>;
  expiration: Date;
};

export function BiddingSummary({
  itemPrice,
  expiration,
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

  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4' }}
      className="p-8 rounded-xl space-y-3 h-full  md:h-full md:w-full"
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

      {/* <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          SHIPPING FEE
        </Text>
        <Text className="font-bold" color="black" size="xl">
          ${15}
        </Text>
      </Group>

      <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          Platform Fee
        </Text>
        <Text className="font-bold" color="black" size="xl">
          ${5}
        </Text>
      </Group> */}

      {/* <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          DISCOUNT
        </Text>
        <Text className="font-bold" color="black" size="xl">
          %0
        </Text>
      </Group> */}

      {/* <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" /> */}

      {/* <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          Sale Price
        </Text>
        <Text className="font-bold" color="black" size="xl">
          {
            actualItemPrice + percentageMarketPlace + percentageSalesTax + 15 + 5
          }
        </Text>
      </Group> */}

      {/* {reciptFee?.map((item, index) => (
        <PositionApart key={item.id} text={item.title} number={item.fees} />
      ))} */}

      {reciptFee?.map((item) => {
        const displayTitle = item.value_type === 'percentage' ? `${item.title} (${item.fees}%)` : item.title;
        const displayFees =
          item.value_type === 'percentage'
            ? ((((isOfferType ? Number(yourOffer) : itemPrice) ?? 0) * Number(item.fees)) / 100).toFixed(2)
            : item.fees;
        return (
          <PositionApart key={`${item.id}-${item.title}`} text={displayTitle} number={Number(displayFees)} sign={'+'} />
        );
      })}
      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />
      <Only when={true}>
        <PositionApart text={'DISCOUNT'} number={Number(discount)} discount={true} sign='-' />
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
            <Button onClick={() => router.back()} className="w-full h-14" classNames={{ root: classes.grayButtonRoot }}>
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
              Earn {totalPrice.toFixed()} points for this purchase
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
  sign?: string;
};
export function PositionApart({ text, number, discount, numberColor, sign }: PositionApartProps) {
  const [discountModal, discountOpened, discountHandler] = useDiscountModal();
  return (
    <Group className="space-x-4" position="apart">
      <Modal
        title="Discount"
        children={discountModal}
        onClose={discountHandler.close}
        open={discountOpened}
        // open={true}
      />
      <Text className="font-bold uppercase" size="sm">
        {text}
        <Only when={!!discount}>
          <span className="ml-4">
            <TransparentButton label={'+Add Code'} onClick={discountHandler.open} />
          </span>
        </Only>
      </Text>
      <Text className="font-bold" color={numberColor ?? 'black'} size="xl">
        {sign}${number}
      </Text>
    </Group>
  );
}
