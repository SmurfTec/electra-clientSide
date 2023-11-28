import { PageTitle, PositionApart, ProductCarousel } from '@elektra/components';
import { ListItemPostContext, Only, baseURL, isAuthenticated, useStylesforGlobal } from '@elektra/customComponents';
import { loadFee, useAppDispatch } from '@elektra/store';
import { ListItemPost } from '@elektra/types';
import { Button, Container, Grid, Group, Image, NumberInput, TextInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useCounter } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Pencil } from 'tabler-icons-react';
import { RootState } from '@elektra/store';
import { useSelector } from '@elektra/store';
import { http, Modal } from '@elektra/customComponents';
import { useShippingChangeModal, useBillingChangeModal } from '@elektra/hooks';
import { usePhoneModal } from '@elektra/hooks/modal/usePhoneModal';
import { checkProfileCompleteness } from '@elektra/customComponents/utils/checkProfileCompleteness';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  const isAuth = await isAuthenticated(context.req);

  if (!isAuth) {
    const sourceUrl = context.req?.headers?.referer || '/';
    return { redirect: { permanent: false, destination: `/auth/login?source=${encodeURIComponent(sourceUrl)}` } };
  }
  return { props: {} };
}

export default function SellNowPage() {
  const [profileCompleteness, setProfileCompleteness] = useState({ isComplete: true, missingFields: '' });
  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);
  const user = useSelector((state: RootState) => state.auth.profile);
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const [PhoneChangeModal, phoneModalOpened, phoneHandler] = usePhoneModal();
  const [BillingChangeModal, billingOpened, billingHandler] = useBillingChangeModal();
  const [infoModalContent, setInfoModalContent] = useState({
    title: 'Incomplete Profile',
    description: `Please complete your profile. Missing: ${profileCompleteness.missingFields}`,
  });

  const [infoModal, infoModalOpen, infoModalHandler] = useInfoModal(infoModalContent);

  const [listItemPost, setListItemPost] = useState<ListItemPost>({
    condition: productDetail.product.condition,
    is_repaired_before: false,
    product: String(productDetail.product.id),
    explain_repair: '',
    condition_details: null,
    more_info: '',
  } as ListItemPost);
  const [count, handlers] = useCounter(Number(productDetail?.product?.highest_offer || 0), {
    min: Number(productDetail?.product?.highest_offer || 0),
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth.profile);
  const is_stripe_account = useSelector((state: RootState) =>
    state.auth.user ? state.auth.user.is_stripe_account : undefined
  );

  const [profile, setprofile] = useState(userData);

  const { classes } = useStylesforGlobal();
  const [shippingaddress, setshippingaddress] = useState<string>(profile?.shipping_address_line_1 || '');
  const [billingaddress, setbillingaddress] = useState<string>(profile?.billing_address_line_1 || '');
  const [phone, setphone] = useState<string>(profile?.mobile_no || '');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFee(String(productDetail?.product?.category?.id)));
  }, []);

  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);

  // const getTotalPrice = () => {
  //   let totalPrice = 0;
  //   feeData?.map((fee) => {
  //     totalPrice += Number(fee.fees);
  //   });
  //   totalPrice += count;
  //   return totalPrice;
  // };

  const getTotalPrice = () => {
    let totalPrice = 0;

    feeData?.forEach((fee) => {
      if (fee.value_type === 'percentage') {
        totalPrice += (totalPrice * Number(fee.fees)) / 100;
      } else {
        totalPrice += Number(fee.fees);
      }
    });

    return Number(totalPrice.toFixed(2));
  };

  const handleSubmit = async () => {
    if (!is_stripe_account) {
      setInfoModalContent({
        title: 'Stripe Account Required',
        description: 'Please connect your Stripe account to sell items.',
      });
      infoModalHandler.open();
      return;
    }

    const profileCheck = checkProfileCompleteness(user);
    if (!profileCheck.isComplete) {
      infoModalHandler.open();
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await http.request({
        url: `/products/${productDetail?.product.id}/sell`,
        method: 'POST',
      });
      setLoading(false);
      if (!res.isError) {
        router.push(`/userdashboard?tab=selling`);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setprofile(userData);
    setshippingaddress(userData?.shipping_address_line_1 || '');
    setbillingaddress(userData?.billing_address_line_1 || '');
    setphone(userData?.mobile_no || '');
  }, [userData]);

  useEffect(() => {
    const result = checkProfileCompleteness(profile);
    setProfileCompleteness(result);
  }, [profile]);

  return (
    <ListItemPostContext.Provider value={{ listItemPost, setListItemPost }}>
      <Container fluid>
        <Modal
          children={infoModal}
          onClose={infoModalHandler.close}
          open={infoModalOpen}
          // open={true}
        />
        <div className="my-10">
          <PageTitle title="Listing Item" />
        </div>
        <Grid className="my-10">
          <Grid.Col md={5}>
            <div>
              <h1 className="text-[32px] font-[700]">{productDetail?.product?.title}</h1>
              <Group>
                <div className="inline-block text-[16px] px-[20px] py-[5px] bg-[#F1F1F1]">
                  Lowest Ask: ${Number(productDetail?.product?.lowest_ask || 0)}
                </div>
                <div className="inline-block px-[20px] text-[16px] py-[5px] bg-[#F1F1F1]">
                  Highest Offer: ${Number(productDetail?.product?.highest_offer || 0)}
                </div>
              </Group>
            </div>
            {listItemPost.condition === 'used' ? (
              <div className="w-screen mt-5 -ml-11 md:w-auto">
                <ProductCarousel images={productDetail.product.images} />
              </div>
            ) : (
              <div className="w-screen mt-5 -ml-12 md:w-auto">
                <Image
                  alt="product image"
                  src={baseURL + '/' + (productDetail?.product?.images?.[0]?.filename || '')}
                />
              </div>
            )}
          </Grid.Col>
          <Grid.Col md={1}></Grid.Col>
          <Grid.Col md={6}>
            <Only when={!is_stripe_account}>
              <div className="flex mt-[30px] justify-between rounded-[6px] px-[10px] items-center w-full h-[70px] bg-[#3C82D6]">
                <p className="text-[13px] text-white">
                  Stripe Connection :{user?.card_details_number ? 'Connected' : ' Not Connected'}
                </p>
                {user?.card_details_number == null && (
                  <Button
                    className="font-[400] text-[13px] hover:!bg-white rounded-[15px] h-[32px] w-[145px] inline-block !lowercase"
                    uppercase
                    disabled={loading}
                    fullWidth
                    size="xl"
                    styles={{ root: { color: '#3C82D6', '&:hover': { color: '#3C82D6', background: 'white' } } }}
                    bg={'white'}
                    onClick={() =>
                      router.push(`/userdashboard?tab=wallet&targetUrl=/product-listing/${productDetail?.product?.id}`)
                    }
                  >
                    Connect Now
                  </Button>
                )}
              </div>
            </Only>
            <div className="flex items-end justify-between">
              <TextInput
                value={shippingaddress}
                onChange={(e) => setshippingaddress(e.target.value)}
                label="Shipping Address"
                className="font-semibold uppercase"
                classNames={{ input: classes.input }}
                disabled
              />
              <Button
                leftIcon={<Pencil />}
                onClick={shippingHandler.open}
                classNames={{ leftIcon: classes.leftIcon, root: 'px-[0.5rem] py-[1.6rem]' }}
              />
            </div>
            <Modal
              size={800}
              title="Shipping Address"
              className="mx-10 mt-4 mb-7"
              titlePosition="left"
              children={ShippingChangeModal}
              onClose={shippingHandler.close}
              open={shippingOpened}
            />
            <div className="flex items-end justify-between">
              <TextInput
                value={billingaddress}
                onChange={(e) => setbillingaddress(e.target.value)}
                label="BiLling Address"
                className="font-semibold uppercase"
                classNames={{ input: classes.input }}
                disabled
              />
              <Button
                leftIcon={<Pencil />}
                onClick={billingHandler.open}
                classNames={{ leftIcon: classes.leftIcon, root: 'px-[0.5rem] py-[1.6rem]' }}
              />
            </div>
            <div className="flex items-end justify-between">
              <TextInput
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                label="Phone Number"
                className="font-semibold uppercase"
                classNames={{ input: classes.input }}
                disabled={true}
              />
              <Button
                leftIcon={<Pencil />}
                // Toggle the disabled state on button click
                onClick={phoneHandler.open}
                classNames={{ leftIcon: classes.leftIcon, root: 'px-[0.5rem] py-[1.6rem]' }}
              />
            </div>
            <Group position="apart" spacing={0} className="px-2 py-1 mt-6 border-black border-solid lg:px-24 md:py-6 ">
              <NumberInput
                disabled
                hideControls
                value={count}
                maw={200}
                p={0}
                onChange={handlers.set}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '$ '
                }
                styles={{
                  input: {
                    height: 'auto',
                    border: 'unset',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  },
                }}
              />
            </Group>
            <div className="my-8">
              <div className="space-y-4">
                {feeData?.map((item: any) => (
                  <PositionApart key={`${item.id}-${item.title}`} text={item.type} number={item.fees} />
                ))}
              </div>
            </div>

            <div className="w-full mt-[20px] flex justify-between items-center text-[16px] px-[10px] py-[15px] bg-[#F1F1F1]">
              <p>Total Payout</p>
              <p className="font-bold">${getTotalPrice()}</p>
            </div>
            <div className="flex items-center gap-3 mt-[20px]">
              <Button
                className="font-[400]"
                uppercase
                disabled={loading}
                fullWidth
                size="xl"
                styles={{ root: { color: 'black', '&:hover': { color: 'white' } } }}
                bg={'#D9D9D9'}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                className="font-[400]"
                uppercase
                fullWidth
                loading={loading}
                size="xl"
                styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
                bg={'black'}
                disabled={
                  Number(productDetail?.product?.highest_offer || 0) == 0 ||
                  userData?.shipping_address_line_1?.length == 0 ||
                  userData?.billing_address_line_1?.length == 0
                }
                onClick={handleSubmit}
              >
                SELL NOW
              </Button>
            </div>
          </Grid.Col>
        </Grid>
        <Modal
          size={800}
          title="Billing Address"
          className="mx-10 mt-4 mb-7"
          titlePosition="left"
          children={BillingChangeModal}
          onClose={billingHandler.close}
          open={billingOpened}
        />
        <Modal
          size={800}
          title="Mobile No"
          className="mx-10 mt-4 mb-7"
          titlePosition="left"
          children={PhoneChangeModal}
          onClose={phoneHandler.close}
          open={phoneModalOpened}
          // open={true}
        />
      </Container>
    </ListItemPostContext.Provider>
  );
}
