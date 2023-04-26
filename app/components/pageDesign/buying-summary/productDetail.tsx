import { Modal, Only, PencilButton } from '@elektra/customComponents';
import { useCardModal, useOfferModal, useShippingChangeModal } from '@elektra/hooks';
import { Grid, Text, Title, useMantineTheme } from '@mantine/core';
import { ItemCard } from '../../card';

type ProductDetailProps = {
  image: string;
  title: string;
  space: string;
  color: string;
  company: string;
  condition: string;
  expiration: string;
  cardDetails: string;
  address: string;
  status?: string;
  saleDate?: string;
};

export function ProductDetail({
  image,
  title,
  space,
  color,
  company,
  condition,
  expiration,
  cardDetails,
  address,
  saleDate,
  status,
}: ProductDetailProps) {
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const [OfferModal, offerOpened, offerHandler] = useOfferModal();
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const theme = useMantineTheme();
  return (
    <div
      style={{ border: '1px solid', borderColor: '#B4B4B4', minHeight: '65vh !important', overflowY: 'auto' }}
      className="p-8 rounded-xl"
    >
      <ItemCard color={color} company={company} image={image} space={space} title={title} key={title} />

      <div className="mt-6 space-y-4">
        <Grid m={0}>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'CONDITION'} details={condition} />
          </Grid.Col>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'Status'} details={'Pending'} />
          </Grid.Col>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'Protection Plan'} details={'13 Months'} />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'Sale Date'} details={String(saleDate)} />
          </Grid.Col>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'Order No'} details={'14'} color={'#3C82D6'} />
          </Grid.Col>
        </Grid>
        <ProductDetails text={'OFFER EXPIRATION'} details={expiration} iconDisplay={true} onClick={offerHandler.open} />
        <Modal title="Offer Expiration" children={OfferModal} onClose={offerHandler.close} open={offerOpened} />

        <ProductDetails text={'CARD DETAILS'} details={cardDetails} iconDisplay={true} onClick={cardHandler.open} />

        <Modal
          className="mx-10 mb-7 mt-4"
          title={'Buying INFO'}
          titlePosition="left"
          size={800}
          children={CardModal}
          onClose={cardHandler.close}
          open={cardOpened}
        />

        <ProductDetails text={'SHIPPING ADDRESS'} details={address} iconDisplay={true} onClick={shippingHandler.open} />
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
  details: string | number;
  iconDisplay?: boolean;
  onClick?: () => void;
  color?: string;
};
export function ProductDetails({ text, details, onClick, iconDisplay, color }: productDetailsProps) {
  return (
    <div>
      <Title className="font-[600]" order={6}>
        {text}
        <Only when={!!iconDisplay}>
          <PencilButton onClick={onClick} />
        </Only>
      </Title>
      <Text color={color} className="font-bold" size="md">
        {details}
      </Text>
    </div>
  );
}
