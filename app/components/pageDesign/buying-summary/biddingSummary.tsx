import { Modal, Only, PencilButton, TransparentButton, useStylesforGlobal } from '@elektra/customComponents';
import { useDiscountModal, useOfferPlaceModal } from '@elektra/hooks';
import { Avatar, Button, Divider, Grid, Group, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';

export type BiddingSummaryProps = {
  yourOffer?: number;
  itemPrice?: number;
  marketPlaceFee: number;
  salesTax: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  disabled?: boolean;
  protectionPlan?: string;
  onClick?: () => void;
  reciptFee:Array<{id:number,fees:number,title:string}>
};

export function BiddingSummary({
  yourOffer,
  itemPrice,
  marketPlaceFee,
  salesTax,
  shippingFee,
  discount,
  totalPrice,
  disabled,
  protectionPlan,
  onClick,
  reciptFee
}: BiddingSummaryProps) {
  const router = useRouter();
  const { classes } = useStylesforGlobal();
  // const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal();
  const isBuying = router.query['condition'] === 'buying';
  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4', overflowY: 'hidden' }}
      className="p-8 rounded-xl space-y-3 h-full md:absolute md:h-full md:w-full"
    >
      <Group className="space-x-4" position="apart">
        <Text className="font-bold" size="sm">
          {yourOffer ? 'Your Offer' : 'Item Price'}
          <Only when={!disabled}>
            <PencilButton />
          </Only>
        </Text>
        <Text className="font-bold" color="black" size="xl">
          ${yourOffer ?? itemPrice}
        </Text>
      </Group>

      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />
      {reciptFee.map((item,index)=>(<PositionApart key={index+item.id} text={item.title} number={item.fees} />))}
      {/* <PositionApart text={'MARKETPLACE FEE'} number={marketPlaceFee} />
      <PositionApart text={'SALES TAX (8.025%)'} number={salesTax} />
      <PositionApart text={'SHIPPING FEE'} number={shippingFee} />
      <Only when={!disabled}>
        <PositionApart text={'DISCOUNT'} number={discount} discount={true} />
      </Only>
      <Only when={!!disabled}>
        <PositionApart text={'PLATFORM FEE'} number={5} discount={false} />
        <PositionApart text={'DISCOUNT'} number={discount} discount={false} />
      </Only>
      <Divider color={'rgba(0, 0, 0, 0.08)'} variant="dashed" size="sm" />
      <PositionApart text={'TOTAL PRICE'} number={totalPrice} numberColor={'#3C82D6'} /> */}
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
              onClick={
                () => {
                  if (onClick) onClick();
                }
                //   {
                //   if (!!protectionPlan) {
                //     offerPlaceHandler.open();
                //   } else {
                //     notifications.show({
                //       withCloseButton: false,
                //       styles: {
                //         icon: {
                //           backgroundColor: 'unset',
                //         },
                //       },
                //       message: 'Select atleast one option for proceeding',
                //       icon: <AlertTriangle color="red" />,
                //     });
                //   }
                // }
              }
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
            <Avatar src="images/coin.png" size={'xs'} radius="lg" />
          </Grid.Col>
          <Grid.Col span={11} className="text-left">
            <Text className="font-bold uppercase" size="sm">
              earn 1500 points for this purchase
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
