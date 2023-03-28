import { useOfferModal, useShippingChangeModal } from '@elektra/hooks';
import { NextImage, Only } from '@elektra/ui';
import { Grid, Group, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { PencilButton, TransparentButton } from '../../buttons';
import { Modal } from '../../modal';

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
  saleDate: string;
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
  const theme = useMantineTheme();
  return (
    <div style={{ border: '1px solid', borderColor: theme.other.color.subTitle }} className="p-8 rounded-xl">
      <Group className="space-x-4">
        <div>
          <Paper bg={theme.other.color.productBackground} className="py-2 px-6 flex justify-center items-center">
            <NextImage height={40} width={35} alt={title} src={image} />
          </Paper>
        </div>
        <div className="space-y-4">
          <Text className="font-bold" size="xl">
            {title}
          </Text>
          <Group>
            <TransparentButton label={space} />
            <TransparentButton label={color} />
            <TransparentButton label={company} />
          </Group>
        </div>
      </Group>

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
            <ProductDetails text={'Sale Date'} details={saleDate} />
          </Grid.Col>
          <Grid.Col p={0} span={4}>
            <ProductDetails text={'Order No'} details={"14"} color={theme.other.color.secondary} />
          </Grid.Col>
        </Grid>
        <ProductDetails text={'OFFER EXPIRATION'} details={expiration} iconDisplay={true} onClick={offerHandler.open} />
        <Modal title="Offer Expiration" children={OfferModal} onClose={offerHandler.close} open={offerOpened} />
        <ProductDetails
          text={'CARD DETAILS'}
          details={cardDetails}
          iconDisplay={true}
          onClick={() => console.log('Hello')}
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
        <Only when={iconDisplay}>
          <PencilButton onClick={onClick} />
        </Only>
      </Title>
      <Text color={color} className="font-bold" size="md">
        {details}
      </Text>
    </div>
  );
}
