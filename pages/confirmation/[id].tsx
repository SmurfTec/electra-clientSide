import { PageTitle, ProductCarousel, ProductDetails, UsedProductListing } from '@elektra/components';
import { ListItem, Modal, Only, baseURL, http, isAuthenticated, useStylesforGlobal } from '@elektra/customComponents';
import {
  useCardModal,
  useProductAddedModal,
  useShippingChangeModal,
  useErrorModal,
  useBillingChangeModal,
} from '@elektra/hooks';
import { Button, Checkbox, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';
import { RootState } from '@elektra/store';
import { useMediaQuery } from '@mantine/hooks';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Check } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { ProductData } from '../../types/slices';
import { ListItemPost } from '@elektra/types';
import { FileWithPath } from '@mantine/dropzone';
import { UsedProductCarousel } from '@elektra/components/pageDesign/product/UsedProductCarousel';
import { usePhoneModal } from '@elektra/hooks/modal/usePhoneModal';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';
import UpdateActionsComponent from '@elektra/customComponents/profile/ProfileUpdateActions';
import { checkProfileCompleteness } from '@elektra/customComponents/utils/checkProfileCompleteness';

const description = [
  'Device has signs of heavy use such as deep scratches, dents, scuffs, or excessive scratching',
  'Fully functional with no operational problems',
  'No chips or cracks in front or back glass',
  'All devices must be free of any lock, carrier blacklist, or financial obligations',
  'Absolutely no Ghost Image',
  'No LCD or display defects (aftermarket, burns, damage or no display)',
];

type ApiData = {
  expiration_date: Date;
  price: number;
  product: number;
  shipping_address: string;
  totalPriceAfterFees?: string;
};

type Details = {
  accessories: string[];
  itemConditions: string[];
  moredetails: string[];
};

type UsedData = {
  files: FileWithPath[];
  listItemPost: ListItemPost;
  details: Details;
  totalPriceAfterFees?: string;
};

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    const sourceUrl = req?.headers?.referer || '/';
    return { redirect: { permanent: false, destination: `/auth/login?source=${encodeURIComponent(sourceUrl)}` } };
  }
  return { props: {} };
}

const base64ToBlob = (base64: any) => {
  const mime = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
  const byteString = atob(base64.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mime });
};

export default function Confirmation() {
  const [profileCompleteness, setProfileCompleteness] = useState({ isComplete: true, missingFields: '' });
  const [PhoneChangeModal, phoneModalOpened, phoneHandler] = usePhoneModal();
  const [BillingChangeModal, billingOpened, billingHandler] = useBillingChangeModal();
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const [infoModal, infoModalOpen, infoModalHandler] = useInfoModal({
    title: 'Incomplete Profile',
    description: `Please complete your profile. Missing: ${profileCompleteness.missingFields}`,
    actions: UpdateActionsComponent({ profileCompleteness, shippingHandler, billingHandler, phoneHandler }),
  });

  const phone = useMediaQuery('(max-width: 600px)');
  const user = useSelector((state: RootState) => state.auth.profile);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const { stats, product } = useSelector((state: RootState) => state.entities.productDetail.list);
  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  let apiData: ApiData = {
    expiration_date: new Date(),
    price: 0,
    product: 0,
    shipping_address: '',
    totalPriceAfterFees: '',
  };

  let usedListingData: UsedData = {
    files: [],
    listItemPost: {
      ask: '',
      condition: 'used',
      condition_details: '',
      explain_repair: '',
      is_repaired_before: false,
      more_info: '',
      product: '',
      listingVariants: [],
    },
    details: {
      accessories: [],
      itemConditions: [],
      moredetails: [],
    },
  };

  const storedData = localStorage.getItem('ListingData');
  const usedProductData = localStorage.getItem('UsedListingData');
  if (storedData !== null) {
    apiData = JSON.parse(storedData);
  }
  if (usedProductData !== null) {
    usedListingData = JSON.parse(usedProductData);
  }
  const router = useRouter();
  const condition: string = router.query['condition'] === 'new' ? 'New' : 'Used';
  const [loading, setLoading] = useState<boolean>(false);
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const [ProductAddedModal, productAddedOpened, productAddedHandler] = useProductAddedModal({
    title: condition.toLowerCase() == 'new' ? 'Ask Placed successfully' : 'Listing Added successfully',
    description:
      condition.toLowerCase() == 'new'
        ? 'You have successfully placed your ask on this product'
        : 'You have successfully listed this item',
  });
  // const [ProductAddedModal, productAddedOpened, productAddedHandler] = useProductAddedModal();

  const [ErrorTxt, setErrorTxt] = useState<string>('');
  const [ErrorChangeModal, ErrorOpened, ErrorHandler] = useErrorModal({ ErrorTxt });

  const { classes } = useStylesforGlobal();

  const handleSubmit = async () => {
    const profileCheck = checkProfileCompleteness(user);
    if (!profileCheck.isComplete) {
      infoModalHandler.open();
      setLoading(false);
      return;
    }
    setLoading(true);
    let data = {};
    if (condition.toLowerCase() === 'new') {
      data = {
        price: apiData.price,
        expiration_date: apiData.expiration_date,
        shipping_address: apiData.shipping_address,
        product: apiData.product,
        totalPriceAfterFees: apiData.totalPriceAfterFees,
      };
      const res = await http.request({
        url: '/asks',
        method: 'POST',
        data,
      });

      if (res.isError) {
        const errdata: any = res.errorPayload;
        setErrorTxt(errdata.message);

        setLoading(false);
        ErrorHandler.open();
      } else {
        setLoading(false);
        productAddedHandler.open();
        setTimeout(() => {
          router.push('/userdashboard?tab=selling');
        }, 4000);
      }
      {
        setLoading(false);
        //   productAddedHandler.open();
      }
    } else {
      const formData = new FormData();
      const mimeToFileExtension = (mime: any) => {
        switch (mime) {
          case 'image/jpeg':
            return '.jpg';
          case 'image/png':
            return '.png';
          case 'image/gif':
            return '.gif';
          case 'image/webp':
            return '.webp';
          case 'image/bmp':
            return '.bmp';
          default:
            return '.img';
        }
      };

      const usedListingData = JSON.parse(localStorage.getItem('UsedListingData') || '{}');
      const base64Files = usedListingData.files || [];

      base64Files.forEach((base64: any, index: any) => {
        const blob = base64ToBlob(base64);
        const extension = mimeToFileExtension(blob.type);
        formData.append('images', blob, `image${index}${extension}`);
      });

      const { listItemPost } = usedListingData;
      // const exclusiveKeys = ['condition_details', 'explain_repair', 'more_info', 'is_repaired_before'];

      const numberKeys = ['product', 'ask'];

      Object.keys(listItemPost).map((key) => {
        // if (exclusiveKeys.includes(key)) {
        //   return;
        // }
        const value = listItemPost[key as keyof ListItemPost];

        if (Array.isArray(value)) {
          value.forEach((item: any, index: any) => {
            formData.append(`listingVariants[${index}][variant]`, String(item.id));
            formData.append(`listingVariants[${index}][value]`, String(item.value));
          });
          return;
        }

        if (numberKeys.includes(key)) {
          formData.append(key, String(value));
          return;
        }

        if (typeof value === 'string') {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      formData.append('expiration_date', usedListingData.expiration_date);

      const res = await http.request({
        url: '/listings',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.isError) {
        const errdata: any = res.errorPayload;
        setErrorTxt(errdata.message);

        setLoading(false);
      } else {
        setLoading(false);
        productAddedHandler.open();
        setTimeout(() => {
          router.push('/userdashboard?tab=selling');
        }, 4000);
      }
      {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const result = checkProfileCompleteness(profile);
    setProfileCompleteness(result);
  }, [profile]);
  return (
    <div>
      <PageTitle title="Confirmation" className="mt-14" />
      <Modal
        children={infoModal}
        onClose={infoModalHandler.close}
        open={infoModalOpen}
        // open={true}
      />
      <Modal
        size={800}
        title="Billing Address"
        className="mx-10 mt-4 mb-7"
        titlePosition="left"
        children={BillingChangeModal}
        onClose={billingHandler.close}
        open={billingOpened}
      />
      <Grid>
        <Grid.Col md={6} mt={50}>
          <Stack align="center" justify="center">
            <Only when={condition.toLowerCase() === 'used'}>
              <div className="w-screen md:w-auto">
                <UsedProductCarousel images={usedListingData.files} />
                {/* <Image alt="product image" src={usedListingData.files[0]} /> */}
              </div>
            </Only>
            <Only when={condition.toLowerCase() === 'new'}>
              <Image alt="product image" src={baseURL + '/' + (product?.images && product?.images[0]?.url)} />
            </Only>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6}>
          <div className="mt-8 space-y-2 xs:mt-auto">
            <Title className="uppercase" color={'#656565'} order={6}>
              About Product
            </Title>
            <Title className="font-bold uppercase" size={phone ? '20px' : '40px'} color={'black'} order={3}>
              {product?.title}
            </Title>
          </div>

          <Group className="space-x-10">
            <div className="mt-2">
              <Text className="text-[13px] font-[500]" color="black">
                My Ask
              </Text>
              {condition.toLowerCase() === 'used' ? (
                <Text className="text-[48px] font-[600]" color="black">
                  ${usedListingData.listItemPost.ask}
                </Text>
              ) : (
                <Text className="text-[48px] font-[600]" color="black">
                  ${apiData?.price}
                </Text>
              )}
            </div>
            <div className="mt-2">
              <Text className="text-[13px] font-[500]" color="black">
                After Fee
              </Text>
              <Text className="text-[48px] font-[600]" color="black">
                {condition.toLowerCase() === 'used' ? (
                  <Text className="text-[48px] font-[600]" color="black">
                    ${usedListingData.totalPriceAfterFees}
                  </Text>
                ) : (
                  <Text className="text-[48px] font-[600]" color="black">
                    ${apiData?.totalPriceAfterFees}
                  </Text>
                )}
              </Text>
            </div>
          </Group>

          <div className="mt-4 space-y-4">
            {/* <ProductDetails
              text={'CARD DETAILS'}
              details={user?.card_details_number||"3454 **** **** ****"}
              iconDisplay={true}
              onClick={cardHandler.open}
            /> */}

            <ProductDetails
              text={'Shipping Address'}
              details={profile?.shipping_address_line_1 || ''}
              iconDisplay={true}
              onClick={shippingHandler.open}
            />
            <ProductDetails
              text={'Description'}
              details={product?.product_properties?.description}
              iconDisplay={false}
              onClick={shippingHandler.open}
            />
            <Only when={condition.toLocaleLowerCase() == 'used'}>
              <section className="space-y-8">
                {/* <div>
                  <Title className="font-[600]" order={6}>
                    What accessories are included
                  </Title>
                  <Group ml={-5} mt={10}>
                    <Group>
                      {usedListingData?.details.accessories.map((item, key) => {
                        return (
                          <Group key={key}>
                            <Button
                              leftIcon={<Check size={12} />}
                              classNames={{ leftIcon: classes.leftIcon, root: 'p-0 h-5 w-5 ml-2 rounded-2xl' }}
                            />
                            <Text color={'black'} size="sm">
                              {item}
                            </Text>
                          </Group>
                        );
                      })}
                    </Group>
                  </Group>
                </div> */}

                {condition.toLocaleLowerCase() == 'used' && (
                  <>
                    <div>
                      <Title className="font-[600]" order={6}>
                        Has your item ever been repaired?
                      </Title>
                      <Group ml={-5} mt={10}>
                        <Group>
                          <Button
                            leftIcon={<Check size={12} />}
                            classNames={{ leftIcon: classes.leftIcon, root: 'p-0 h-5 w-5 ml-2 rounded-2xl' }}
                          />
                          <Text color={'black'} size="sm">
                            {usedListingData?.listItemPost?.is_repaired_before ? 'Yes' : 'No'}
                          </Text>
                        </Group>
                      </Group>
                      {/* <Text className="mt-6" color={'black'} size="md">
                   {productD}
                  </Text> */}
                    </div>
                    {usedListingData?.listItemPost?.is_repaired_before && (
                      <div>
                        <Title className="font-[600]" order={6}>
                          Which Best describes the overall condition of your item?
                        </Title>
                        <Text color={'black'} size="sm">
                          {usedListingData?.listItemPost?.explain_repair}
                        </Text>
                      </div>
                    )}

                    <div>
                      <Title className="font-[600]" order={6}>
                        What best describes overall condition of your item?
                      </Title>
                      <Text color={'black'} size="md">
                        {usedListingData?.listItemPost?.condition_details}
                      </Text>
                    </div>
                    <div>
                      <Title className="font-[600]" order={6}>
                        More info
                      </Title>
                      <Text color={'black'} size="sm">
                        {usedListingData?.listItemPost?.more_info}
                      </Text>
                    </div>
                    {/* <div>
                      <Title className="font-[600] mb-[20px]" order={6}>
                        More About This Item
                      </Title>
                      <ListItem
                        className="space-y-4"
                        data={usedListingData?.details?.moredetails}
                        icon={<Check size={20} strokeWidth={2} color={'black'} />}
                      />
                    </div> */}
                  </>
                )}
              </section>
              <Group></Group>
            </Only>
            <ProductDetails text={'Condition'} details={condition} />
            {condition == 'used' && (
              <ListItem
                className="space-y-4"
                data={description}
                icon={<Check size={20} strokeWidth={2} color={'black'} />}
              />
            )}

            {product?.product_variants?.map((item, key) => {
              return <ProductDetails key={key} text={item.variant} details={item.value} />;
            })}
            {/* <ProductDetails text={'Capacity'} details="128GB" />
            <ProductDetails text={'Carrier'} details="AT&T" />
            <ProductDetails text={'Color'} details="Blue" /> */}

            <Group pt={14} align="top">
              <Checkbox
                checked={check1}
                onChange={(e) => setcheck1(!check1)}
                maw={'20%'}
                styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }}
                value={'First'}
              />
              <Text mt={-7} maw={'80%'} size="13px" color="black">
                By Checking this you are confirming your device meets the condition requirments stated above
              </Text>
            </Group>
            <Group mt={14} align="top">
              <Checkbox
                checked={check2}
                onChange={(e) => setcheck2(!check2)}
                maw={'20%'}
                styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }}
                value={'First'}
              />
              <Text mt={-7} maw={'80%'} size="13px" color="black">
                You understand you are subject to a <span className="font-[600]">12% cancelation fee</span> if the item
                fails verifcation.
              </Text>
            </Group>
          </div>
          <div className="mt-8 space-y-2">
            <Button
              className="font-[400]"
              uppercase
              fullWidth
              size="xl"
              styles={{ root: { color: 'white', '&:hover': { color: 'white' } } }}
              bg={`black`}
              disabled={!check1 || !check2}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
            <Button
              className="font-[400]"
              uppercase
              fullWidth
              size="xl"
              styles={{ root: { color: 'black', '&:hover': { color: 'white' } } }}
              bg={'#D9D9D9'}
            >
              Cancel
            </Button>
          </div>
        </Grid.Col>
      </Grid>

      <Modal
        className="px-0 mx-0 mt-4 xs:mx-10 mb-7"
        title={'Buying INFO'}
        titlePosition="left"
        size={900}
        children={CardModal}
        onClose={cardHandler.close}
        open={cardOpened}
      />
      <Modal title={'Listing Failed'} children={ErrorChangeModal} onClose={ErrorHandler.close} open={ErrorOpened} />
      <Modal
        // title={'Ask Placed Successfully'}
        children={ProductAddedModal}
        onClose={productAddedHandler.close}
        open={productAddedOpened}
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
  );
}
