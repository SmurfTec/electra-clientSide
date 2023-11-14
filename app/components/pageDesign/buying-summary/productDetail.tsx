import { Modal, Only, PencilButton } from '@elektra/customComponents';
import { useCardModal, useOfferModal, useShippingChangeModal } from '@elektra/hooks';
import { Variant } from '@elektra/types';
import { Grid, Text, Title } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ItemCard } from '../../card';
import { usePhoneModal } from '@elektra/hooks/modal/usePhoneModal';

type ProductDetailProps = {
  image: string;
  title: string;
  condition: string;
  expiration: string;
  cardDetails: string;
  address: string;
  status?: string;
  saleDate?: string;
  orderNo?: string;
  disabled: boolean;
  protectionPlan?: string;
  productVariants: Variant[];
  setExpiration: Dispatch<SetStateAction<Date>>;
  trackingId?: string;
  phone?: string | null;
};

export function ProductDetail({
  image,
  title,
  setExpiration,
  condition,
  expiration,
  cardDetails,
  address,
  saleDate,
  status,
  orderNo,
  disabled,
  protectionPlan,
  productVariants,
  trackingId,
  phone
}: ProductDetailProps) {
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const [OfferModal, offerOpened, offerHandler, expirationDate] = useOfferModal();
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const [phoneChangeModal, phoneModalOpened, phoneHandler] = usePhoneModal();

  useEffect(() => {
    const newDate = new Date().setDate(new Date().getDate() + Number(expirationDate));
    setExpiration(new Date(newDate));
  }, [expirationDate]);

  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4', minHeight: '65vh !important', overflowY: 'auto' }}
      className="p-8 rounded-xl h-full"
    >
      <ItemCard productVariants={productVariants} image={image} title={title} key={title} />

      <div className="mt-6 space-y-4">
        <Grid m={0}>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'CONDITION'} details={condition} />
          </Grid.Col>
          {status && (
            <Grid.Col p={0} span={4}>
              <ProductDetails text={'Status'} details={status} />
            </Grid.Col>
          )}

          {/* {protectionPlan && (
            <Grid.Col p={0} span={4}>
              <ProductDetails text={'Protection Plan'} details={protectionPlan} />
            </Grid.Col>
          )} */}
        </Grid>
        <Grid>
          {saleDate && (
            <Grid.Col p={0} span={4}>
              <ProductDetails text={'Sale Date'} details={String(saleDate)} />
            </Grid.Col>
          )}

          {orderNo && (
            <Grid.Col p={0} span={4}>
              <ProductDetails text={'Order No'} details={orderNo} color={'#3C82D6'} />
            </Grid.Col>
          )}

          {trackingId && (
            <Grid.Col p={0} span={4}>
              <ProductDetails text={'Tracking Id'} details={trackingId} />
            </Grid.Col>
          )}
        </Grid>
        {/* <ProductDetails
          text={'OFFER EXPIRATION'}
          details={expiration}
          iconDisplay={!disabled}
          onClick={offerHandler.open}
        /> */}
        <Modal title="Offer Expiration" children={OfferModal} onClose={offerHandler.close} open={offerOpened} />

        {/* <ProductDetails
          text={'CARD DETAILS'}
          details={cardDetails}
          iconDisplay={!disabled}
          onClick={cardHandler.open}
        /> */}

        <Modal
          className="px-0 mx-0 mt-4 xs:mx-10 mb-7"
          title={'Buying INFO'}
          titlePosition="left"
          size={900}
          children={CardModal}
          onClose={cardHandler.close}
          open={cardOpened}
        />

        <ProductDetails
          text={'SHIPPING ADDRESS'}
          details={address}
          iconDisplay={!disabled}
          onClick={shippingHandler.open}
        />
        <ProductDetails text={'Phone'} details={phone} iconDisplay={!disabled} onClick={phoneHandler.open} />
        <Modal
          size={800}
          title="Mobile No"
          className="mx-10 mt-4 mb-7"
          titlePosition="left"
          children={phoneChangeModal}
          onClose={phoneHandler.close}
          open={phoneModalOpened}
          // open={true}
        />
        <Modal
          title="Shipping Address"
          titlePosition="left"
          size={800}
          children={ShippingChangeModal}
          onClose={shippingHandler.close}
          open={shippingOpened}
        />
      </div>
    </div>
  );
}

type productDetailsProps = {
  text: string;
  details: any;
  iconDisplay?: boolean;
  onClick?: () => void;
  color?: string;
};
export function ProductDetails({ text, details, onClick, iconDisplay, color, ...rest }: productDetailsProps) {
  return (
    <div {...rest}>
      <Title className="font-[600]" order={6}>
        {text}
        <Only when={!!iconDisplay}>
          <PencilButton onClick={onClick} />
        </Only>
      </Title>
      <Text color={color ?? 'black'} size="md">
        {details}
      </Text>
    </div>
  );
}
