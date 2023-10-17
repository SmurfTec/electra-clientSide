import { PageTitle, ProductCarousel, ProductDetails } from '@elektra/components';
import { ListItem, Modal, Only, http, isAuthenticated, useStylesforGlobal } from '@elektra/customComponents';
import { useCardModal, useProductAddedModal, useShippingChangeModal } from '@elektra/hooks';
import { Button, Checkbox, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Check } from 'tabler-icons-react';
import { RootState } from '@elektra/store';
import { useSelector } from 'react-redux';
const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet,',
  'No chips or cracks in front or back glass',
  'Mauris id lacus gravida erat rutrum facilisis.',
  'Sed et quam pretium, laoreet metus sed,',
];

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  return { props: {} };
}

export default function Confirmation() {
  const phone = useMediaQuery('(max-width: 600px)');
  const [loading, setLoading] = useState<boolean>(false);
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const [ProductAddedModal, productAddedOpened, productAddedHandler] = useProductAddedModal();
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const router = useRouter();
  const condition = router.query['condition'] === 'new' ? 'New' : 'Used';
  const { classes } = useStylesforGlobal();
  const[check1,setcheck1]=useState(false)
  const[check2,setcheck2]=useState(false)
  const profile = useSelector((state: RootState) => state.auth.profile);
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      condition: 'string',
      ask: 0,
      is_active: true,
      is_flagged: true,
      is_repaired_before: true,
      explain_repair: 'string',
      condition_details: 'string',
      more_info: 'string',
      product: 0,
    };
    const res = await http.request({
      url: '/listings',
      method: 'POST',
      data,
    });
    if (res.isError) {
      setLoading(false);
    }
    {
      setLoading(false);
      productAddedHandler.open();
    }
  };

  return (
    <div>
      <PageTitle title="Confirmation" className="mt-14" />
      <Grid>
        <Grid.Col md={6} mt={50}>
          <Stack align="center" justify="center">
            <Only when={condition !== 'New'}>
              <div className="w-screen md:w-auto">
                <ProductCarousel images={[]} />
              </div>
            </Only>
            <Only when={condition === 'New'}>
              <Image alt="product image" src="/images/productImage.png" />
            </Only>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6}>
          <div className="mt-8 space-y-2 xs:mt-auto">
            <Title className="uppercase" color={'#656565'} order={6}>
              About Product
            </Title>
            <Title className="font-bold uppercase" size={phone ? '20px' : '40px'} color={'black'} order={3}>
              IPhone 14 Pro Max
            </Title>
          </div>

          <Group className="space-x-10">
            <div className="mt-2">
              <Text className="text-[13px] font-[500]" color="black">
                My Ask
              </Text>
              <Text className="text-[48px] font-[600]" color="black">
                $168
              </Text>
            </div>
            <div className="mt-2">
              <Text className="text-[13px] font-[500]" color="black">
                After Fee
              </Text>
              <Text className="text-[48px] font-[600]" color="black">
                $190
              </Text>
            </div>
          </Group>

          <div className="mt-4 space-y-4">
            {/* <ProductDetails
              text={'CARD DETAILS'}
              details="3454 **** **** ****"
              iconDisplay={true}
              onClick={cardHandler.open}
            /> */}

            <ProductDetails
              text={'Shipping Address'}
              details={profile?.shipping_address_line_1 || ""}
              iconDisplay={true}
              onClick={shippingHandler.open}
            />
            <Only when={condition === 'Used'}>
              <section className="space-y-8">
                <div>
                  <Title className="font-[600]" order={6}>
                    What accessories are included
                  </Title>
                  <Group ml={-5} mt={10}>
                    <Group>
                      <Button
                        leftIcon={<Check size={12} />}
                        classNames={{ leftIcon: classes.leftIcon, root: 'p-0 h-5 w-5 ml-2 rounded-2xl' }}
                      />
                      <Text color={'black'} size="sm">
                        Charger Cable
                      </Text>
                    </Group>
                    <Group>
                      <Button
                        leftIcon={<Check size={12} />}
                        classNames={{ leftIcon: classes.leftIcon, root: 'p-0 h-5 w-5 ml-2 rounded-2xl' }}
                      />
                      <Text color={'black'} size="sm">
                        Original Box
                      </Text>
                    </Group>
                  </Group>
                </div>
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
                        Yes
                      </Text>
                    </Group>
                  </Group>
                  <Text className="mt-6" color={'black'} size="md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tincidunt elit. Nunc euismod odio
                    sit amet lorem lobortis, vel lacinia libero tristique
                  </Text>
                </div>
                <div>
                  <Title className="font-[600]" order={6}>
                    What best describes overall condition of your item?
                  </Title>
                  <Text color={'black'} size="md">
                    Great
                  </Text>
                </div>
              </section>
              <Group></Group>
            </Only>
            <ProductDetails text={'Condition'} details={condition} />

            <ListItem
              className="space-y-4"
              data={description}
              icon={<Check size={20} strokeWidth={2} color={'black'} />}
            />

            <ProductDetails text={'Capacity'} details="128GB" />
            <ProductDetails text={'Carrier'} details="AT&T" />
            <ProductDetails text={'Color'} details="Blue" />

            <Group pt={14} align="top">
              <Checkbox checked={check1} onChange={(e)=>setcheck1(!check1)} maw={'20%'} styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }} value={'First'} />
              <Text mt={-7} maw={'80%'} size="13px" color="black">
                By Checking this you are confirming your device meets the condition requirments stated above
              </Text>
            </Group>
            <Group mt={14} align="top">
              <Checkbox checked={check2} onChange={(e)=>setcheck2(!check2)} maw={'20%'} styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }} value={'First'} />
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
              bg={'black'}
              disabled={(!check1 || !check2)}
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
      <Modal children={ProductAddedModal} onClose={productAddedHandler.close} open={productAddedOpened} />
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
