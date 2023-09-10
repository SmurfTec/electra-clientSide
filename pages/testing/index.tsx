import {
  Footer,
  HeroImage,
  ItemCard,
  PageTitle,
  ProductSpecification,
  SimpleStatCardProps,
  SimpleStateCard,
} from '@elektra/components';
import { Drawer, Modal, http, useStylesforGlobal } from '@elektra/customComponents';
import { useOfferModal, useSellerDetailDrawer, useTechinalSpecificationDrawer } from '@elektra/hooks';
import { Carousel } from '@mantine/carousel';
import { Button, Container, Grid, Group, Image, Text } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';

type condition = 'new' | 'used';

// const itemCardData: ItemCardProps = {
//   color: 'black',
//   company: 'AT&T',
//   image: '/images/product.png',
//   space: '128GB',
//   title: 'Iphone 14 Pro Max',
//   status: 'Sold',
//   price: 1000,
//   date: '29/10/10',
//   sale: true,
// };

const productData = [
  {
    id: 4,
    img: '/images/product.png',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
    condition: 'New',
  },
  {
    id: 5,
    img: '/images/product.png',
    link: '#',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    rating: null,
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
];

const categoryData = [
  {
    id: 1,
    image: '/images/category.png',
    title: 'Laptops',
    link: '#',
  },
  {
    id: 2,
    image: '/images/category.png',
    title: 'Phones',
    link: '#',
  },
  {
    id: 3,
    image: '/images/category.png',
    title: 'Phones',
    link: '#',
  },
  {
    id: 4,
    image: '/images/category.png',
    title: 'Phones',
    link: '#',
  },
  {
    id: 5,
    image: '/images/category.png',
    title: 'Phones',
    link: '#',
  },
  {
    id: 6,
    image: '/images/category.png',
    title: 'Phones',
    link: '#',
  },
];

const carouselData = [
  {
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 13',
  },
  {
    imgSrc: '/images/carousel/centerLaptop.png',
    title: 'Razer Blade 14',
  },
  {
    imgSrc: '/images/carousel/rightLaptop.png',
    title: 'Razer Blade 15',
  },
  {
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 16',
  },
];

const SimpleStatCardData: SimpleStatCardProps[] = [
  {
    title: 'Total Value',
    value: 3000,
    type: '$',
  },
  {
    title: 'Pending Orders',
    value: 5,
    type: 'N/A',
  },
];
const carouselViewData = [
  {
    imgSrc: '/images/carousel/iphoneblack.png',
  },
  {
    imgSrc: '/images/carousel/iphonefront.png',
  },
  {
    imgSrc: '/images/carousel/iphonefull.png',
  },
];
const productSpecification = [
  //NEW PRODUCT
  {
    title: 'Iphone 14 Pro Max',
    condition: 'New',
    colorData: ['Black', 'Blue', 'Purple', 'Matte Black', 'White'],
    color: 'Blue',
    capacityData: ['16GB', '64Gb', '128Gb', '256GB'],
    capacity: '128GB',
    carrierData: ['AT&T', 'T-Mobile', 'Verizon', 'Factory Unlocked'],
    carrier: 'Verizon',

    lowestAsk: 169,
    highestAsk: 179,
    price: 400,
  },
  //USED PRODUCT
  {
    title: 'Iphone 14 Pro Max',
    condition: 'Used',
    colorData: ['Black', 'Blue', 'Purple', 'Matte Black', 'White'],
    color: 'Blue',
    capacityData: ['16GB', '64Gb', '128Gb', '256GB'],
    capacity: '128GB',
    carrierData: ['AT&T', 'T-Mobile', 'Verizon', 'Factory Unlocked'],
    carrier: 'Verizon',

    sellerCondition: 'Used/Fair',
    sellerColor: 'Black',
    sellerCapacity: '128GB',
    sellerCarrier: 'Verizon',
    lowestAsk: 169,
    highestAsk: 179,
    price: 400,
  },
];

const productDetailData = {
  image: '/images/product.png',
  title: 'Iphone 14 Pro Max',
  space: '128 GB',
  color: 'Black',
  company: 'AT&T',
  condition: 'New',
  expiration: '23/10/2023',
  cardDetails: '3646 **** **** ****',
  address: '16 Street , Town Abc, City, USA , 213434',
  saleDate: '23/10/2023',
};

export default function Testing() {
  const { classes } = useStylesforGlobal();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const [value, setValue] = useState(0);
  const [offerModal, offerOpened, offerHandler] = useOfferModal();
  // const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal();
  const [SellerDetailModal, sellerDetailOpened, sellerDetailHandler] = useSellerDetailDrawer();
  const [TechinalSpecificationModal, techinalSpecificationOpened, techinalSpecificationHandler] =
    useTechinalSpecificationDrawer({ techinalSpecificationDrawerData: [] });

  const handleTest = async () => {
    const res = await http.request({
      url: '/notifications/9',
      // method: 'POST',
    });
  };

  return (
    <div>
      <div className="my-96 w-full">{/* <ProductCharts /> */}</div>

      <div>
        <HeroImage />
      </div>
      <div className="my-96">
        <Button onClick={handleTest}>Click</Button>
      </div>

      <div className="my-96">
        <Group position="center">
          <Drawer
            title="Details from seller"
            children={SellerDetailModal}
            onClose={sellerDetailHandler.close}
            open={sellerDetailOpened}
          />
          <Button onClick={sellerDetailHandler.open}>Seller Drawer</Button>
        </Group>
      </div>
      <div className="my-96">
        <Group position="center">
          <Drawer
            title="Technical Specification"
            children={TechinalSpecificationModal}
            onClose={techinalSpecificationHandler.close}
            open={techinalSpecificationOpened}
          />
          <Button onClick={techinalSpecificationHandler.open}>Drawer</Button>
        </Group>
      </div>

      <div className="my-96">
        <Group position="center">
          <Modal title="Offer Expiration" children={offerModal} onClose={offerHandler.close} open={offerOpened} />
          <Button onClick={offerHandler.open}>Email Verfication Model</Button>
        </Group>
      </div>

      <div className="my-96">
        <ItemCard
          image={productDetailData.image}
          productVariants={[]}
          title={productDetailData.title}
          key={productDetailData.title}
        />
        {/* <Group position="center">
          <Modal
            title="Offer Placed!"
            children={OfferPlaceModal}
            onClose={offerPlaceHandler.close}
            open={offerPlaceOpened}
          />
          <Button onClick={offerPlaceHandler.open}>Offer Place Modal</Button>
        </Group> */}
      </div>

      <div>
        <Carousel
          withIndicators
          height={600}
          slideSize="33.333333%"
          slideGap="md"
          loop={true}
          align="start"
          slidesToScroll={1}
          draggable={false}
          plugins={[autoplay.current]}
          withKeyboardEvents
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          onSlideChange={(index) => {
            carouselData.length === index + 1 ? setValue(0) : setValue(index + 1);
          }}
        >
          {carouselData.map((item, index) => {
            return (
              <Carousel.Slide key={index}>
                <div>
                  <Image alt="" height={index === value ? '500px' : '300px'} src={item.imgSrc} />
                  <Group position="center">
                    <Text size="xl">{item.title}</Text>
                    <Button
                      leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
                      variant="outline"
                      classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
                    />
                  </Group>
                </div>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </div>

      {/* <div className="m-96">
        <Group position="center">
          <MantineModal
            fullScreen
            overlayProps={{
              color: 'black',
              opacity: 0.5,
              blur: 2,
            }}
            styles={{
              root: {
                backgroundColor: 'blue !important',
              },
              content: {
                background: 'transparent',
              },
              header: {
                background: 'transparent',
              },
            }}
            className="bg-transparent"
            keepMounted={false}
            closeButtonProps={{ radius: '100%', size: 'lg' }}
            children={carouselModal}
            onClose={carouselHandler.close}
            opened={carouselOpened}
          />

          <Button onClick={carouselHandler.open}>Image Model</Button>
        </Group>
      </div> */}
      {/* <div className="m-96">
        <ShowTime autoPlay>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            />
            <p className="legend">Legend 3</p>
          </div>
        </ShowTime>
      </div> */}

      {/* <div className="m-96">
        <Carousel maw={1000} mx="auto" withIndicators height={200}>
          {carouselViewData.map((item, index) => {
            return (
              <Carousel.Slide key={index}>
                <Image fit="cover" src={item.imgSrc} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </div> */}

      {/* <div>
        <Group position="center">
          <Modal
            title="Email Verification"
            children={<EmailVerificationModel email="huzayfahhanif@gmail.com" />}
            onClose={close}
            open={opened}
          />
          <Button onClick={open}>Email Verfication Model</Button>
        </Group>
      </div> */}

      {/* <div className="mt-16">
        <Group position="center">
          <Modal size={500} children={<SignUpSuccesfullModal   />} onClose={close} open={opened} />
          <Button onClick={open} >SignUp Succesfull Model</Button>
        </Group>
      </div> */}

      {/* <div className="mt-16">
        <Group position="center">
          <Modal title='Change Password' children={<PasswordChangeModel   />} onClose={close} open={opened} />
          <Button onClick={open} >Password Change Model</Button>
        </Group>
      </div> */}

      <div className="my-40">
        <PageTitle title="Buying Summary" />
      </div>

      {/* <div className="mt-16">
        <Group position="center">
          <Modal children={<EmailSentModal  email='huzayfahhanif@gmail.com'   />} onClose={close} open={opened} />
          <Button onClick={open} >Email Sent Model</Button>
        </Group>
      </div> */}
      {/* <div className="mt-16">
        <Group position="center">
          <Modal children={<ProductAddedModal />} onClose={close} open={opened} />
          <Button onClick={open}>Product Added Model</Button>
        </Group>
      </div> */}

      {/* <div className="mt-16">
        <Group position="center">
          <Modal children={<RedeemUnSuccesfullModal />} onClose={close} open={opened} />
          <Button onClick={open}>Redeem Model</Button>
        </Group>
      </div> */}

      <div className="ml-32">
        <Button
          leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
          variant="outline"
          classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
        />
      </div>
      <Container my={100} fluid>
        
      </Container>

      <Container mb={100}>
        {/* <ItemCard
          color={itemCardData.color}
          company={itemCardData.company}
          image={itemCardData.image}
          space={itemCardData.space}
          title={itemCardData.title}
          date={itemCardData.date}
          price={itemCardData.price}
          sale={itemCardData.sale}
          key={1}
          status={itemCardData.status}
        /> */}
      </Container>

      <Container>
        <Grid>
          {SimpleStatCardData.map((item, key) => (
            <Grid.Col span={3} key={key}>
              <SimpleStateCard title={item.title} value={item.value} type={item.type} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <div className="mt-96">
        <Footer />
      </div>
    </div>
  );
}
