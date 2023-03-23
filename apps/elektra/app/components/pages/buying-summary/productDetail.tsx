// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useOfferModel, useShippingChangeModel } from '@elektra/hooks';
import { NextImage, Only } from '@elektra/ui';
import { Group, Paper, Text, Title, useMantineTheme } from '@mantine/core';
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
}: ProductDetailProps) {
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModel();
  const [OfferModal, offerOpened, offerHandler] = useOfferModel();
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
        <ProductDetails text={'CONDITION'} details={condition} />
        <ProductDetails text={'CONDITION'} details={condition} />
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
};
function ProductDetails({ text, details, onClick, iconDisplay }: productDetailsProps) {
  return (
    <div>
      <Title className="font-[600]" order={6}>
        {text}
        <Only when={iconDisplay}>
          <PencilButton onClick={onClick} />
        </Only>
      </Title>
      <Text className="font-bold" size="md">
        {details}
      </Text>
    </div>
  );
}
