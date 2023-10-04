import { PageTitle, ProductCarousel, ProductDetails } from '@elektra/components';
import { ListItem, Modal, Only, http, isAuthenticated, useStylesforGlobal } from '@elektra/customComponents';
import { useCardModal, useProductAddedModal, useShippingChangeModal,useErrorModal } from '@elektra/hooks';
import { Button, Checkbox, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';
import { RootState } from '@elektra/store';
import { useMediaQuery } from '@mantine/hooks';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Check } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { ProductData } from '../../types/slices';

const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet,',
  'No chips or cracks in front or back glass',
  'Mauris id lacus gravida erat rutrum facilisis.',
  'Sed et quam pretium, laoreet metus sed,',
];

type ApiData={
    expiration_date:Date,
    price:number,
    product:number,
    shipping_address:string
}
export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  return { props: {} };
}

export default function Confirmation() {
  const phone = useMediaQuery('(max-width: 600px)');
  const{stats,product}=useSelector((state:RootState)=>state.entities.productDetail.list)
  let apiData:ApiData={
    expiration_date:new Date(),
    price:0,
    product:0,
    shipping_address:""
  }
  const storedData = localStorage.getItem('ListingData');
  if(storedData!==null){
    apiData=JSON.parse(storedData)
  }
  console.log(product,apiData,"checking")
  const [loading, setLoading] = useState<boolean>(false);
  const [CardModal, cardOpened, cardHandler] = useCardModal();
  const [ProductAddedModal, productAddedOpened, productAddedHandler] = useProductAddedModal();
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
  const[ErrorChangeModal, ErrorOpened, ErrorHandler]=useErrorModal();
  const router = useRouter();
  const condition:string =  product?.condition //router.query['condition'] === 'new' ? 'New' : 'Used';
  const { classes } = useStylesforGlobal();


  const handleSubmit = async () => {
    setLoading(true);
    const data={
        price:apiData.price, 
        expiration_date: apiData.expiration_date,
        shipping_address: apiData.shipping_address,
        product: apiData.product
      }
      if(condition.toLowerCase() === 'new'){
        const res = await http.request({
            url: '/asks',
            method: 'POST',
          data,
        });
        if (res.isError) {
          setLoading(false);
          ErrorHandler.open()
        }else{
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
          
      }else{

      }
   
  };

  return (
    <div>
      <PageTitle title="Confirmation" className="mt-14" />
      <Grid>
        <Grid.Col md={6} mt={50}>
          <Stack align="center" justify="center">
            <Only when={condition.toLowerCase() !== 'new'}>
              <div className="w-screen md:w-auto">
                <ProductCarousel images={product.images} />
              </div>
            </Only>
            <Only when={condition.toLowerCase() === 'new'}>
              <Image alt="product image" src={product?.images && product?.images[0]?.url} />
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
              <Text className="text-[48px] font-[600]" color="black">
                ${apiData?.price}
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
            <ProductDetails
              text={'CARD DETAILS'}
              details="3454 **** **** ****"
              iconDisplay={true}
              onClick={cardHandler.open}
            />

            <ProductDetails
              text={'Shipping Address'}
              details={apiData?.shipping_address}
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
            {
                product?.product_variants?.map((item)=>{
                    return(
                        <ProductDetails text={item.variant} details={item.value} />   
                    )
                })
            }
            {/* <ProductDetails text={'Capacity'} details="128GB" />
            <ProductDetails text={'Carrier'} details="AT&T" />
            <ProductDetails text={'Color'} details="Blue" /> */}

            <Group pt={14} align="top">
              <Checkbox maw={'20%'} styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }} value={'First'} />
              <Text mt={-7} maw={'80%'} size="13px" color="black">
                By Checking this you are confirming your device meets the condition requirments stated above
              </Text>
            </Group>
            <Group mt={14} align="top">
              <Checkbox maw={'20%'} styles={{ input: { background: '#D9D9D9', borderRadius: '0' } }} value={'First'} />
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
      <Modal children={ErrorChangeModal} onClose={ErrorHandler.close} open={ErrorOpened} />
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
