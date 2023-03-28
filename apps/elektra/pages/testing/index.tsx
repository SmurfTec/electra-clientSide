import {
  CategoryCard,
  Footer,
  HeroImage,
  Modal,
  ProductCard,
  ProductSpecification,
  SimpleStatCardProps,
  SimpleStateCard,
  useStylesforGlobal,
} from '@elektra/components';
import { useOfferModel } from '@elektra/hooks';
import { SearchBox } from '@elektra/ui';
import { Carousel } from '@mantine/carousel';
import { Button, Container, Grid, Group, Image, Text } from '@mantine/core';
import { PageTitle } from 'apps/elektra/app/components/AppTitle';
import { ItemCard, ItemCardProps } from 'apps/elektra/app/components/card/itemCard';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';

type condition = 'New' | 'Used';

const itemCardData: ItemCardProps = {
  color: 'black',
  company: 'AT&T',
  image: '/images/product.png',
  space: '128GB',
  title: 'Iphone 14 Pro Max',
  status: 'Sold',
  price: 1000,
  date: new Date(),
  sale: true,
};

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

export default function Index() {
  const { classes } = useStylesforGlobal();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const [value, setValue] = useState(0);
  const [offerModal, offerOpened, offerHandler] = useOfferModel();

  return (
    <div>
      <div className="p-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center">
          {productData.map((product) => {
            return (
              <ProductCard
                id={product.id}
                key={product.id}
                image={product.img}
                description={product.description}
                link={product.link}
                title={product.title}
                rating={product.rating}
                wishlist={product.wishlist}
                lowestPrice={product.lowestPrice ?? null}
                highestPrice={product.highestPrice ?? null}
                price={product.price}
              />
            );
          })}
        </div>

        <div style={{ marginTop: '100px' }} className="grid lg:grid-cols-6 md:grid-cols-3 gap-12 place-content-center">
          {categoryData.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                image={category.image}
                id={category.id}
                title={category.title}
                link={category.link}
              />
            );
          })}
        </div>
      </div>
      <div className="w-96 ml-96">
        <SearchBox />
      </div>
      <div>
        <HeroImage />
      </div>

      <div>
        <Group position="center">
          <Modal title="Offer Expiration" children={offerModal} onClose={offerHandler.close} open={offerOpened} />
          <Button onClick={offerHandler.open}>Email Verfication Model</Button>
        </Group>
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
                  {/* <Image  src={item.imgSrc} /> */}
                  <Image height={index === value ? '500px' : '300px'} src={item.imgSrc} />
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

      <div className="m-96">
        <Carousel maw={320} mx="auto" withIndicators height={200}>
          {carouselViewData.map((item, index) => {
            return (
              <Carousel.Slide key={index}>
                <Image fit="cover" src={item.imgSrc} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </div>

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
          <Modal children={<SignUpUnSuccesfullModal  />} onClose={close} open={opened} />
          <Button onClick={open} >Signup Unsuccessful Model</Button>
        </Group>
      </div> */}

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
        <Grid grow gutterXl={20}>
          <Grid.Col p={0} span={6}>
            <ProductSpecification
              title={productSpecification[1].title}
              condition={productSpecification[1].condition as condition}
              capacity={productSpecification[1].capacity}
              capacityData={productSpecification[1].capacityData}
              carrier={productSpecification[1].carrier}
              carrierData={productSpecification[1].carrierData}
              color={productSpecification[1].color}
              colorData={productSpecification[1].colorData}
              highestAsk={productSpecification[1].highestAsk}
              lowestAsk={productSpecification[1].lowestAsk}
              price={productSpecification[1].price}
              sellerCondition={productSpecification[1].sellerCondition}
              sellerColor={productSpecification[1].sellerColor}
              sellerCapacity={productSpecification[1].sellerCapacity}
              sellerCarrier={productSpecification[1].sellerCarrier}
            />
          </Grid.Col>
          <Grid.Col p={0} span={6}>
            <ProductSpecification
              title={productSpecification[0].title}
              condition={productSpecification[0].condition as condition}
              capacity={productSpecification[0].capacity}
              capacityData={productSpecification[0].capacityData}
              carrier={productSpecification[0].carrier}
              carrierData={productSpecification[0].carrierData}
              color={productSpecification[0].color}
              colorData={productSpecification[0].colorData}
              highestAsk={productSpecification[0].highestAsk}
              lowestAsk={productSpecification[0].lowestAsk}
              price={productSpecification[0].price}
              sellerCapacity={productSpecification[0].sellerCapacity}
              sellerCarrier={productSpecification[0].sellerCarrier}
              sellerColor={productSpecification[0].sellerColor}
              sellerCondition={productSpecification[0].sellerCondition}
            />
          </Grid.Col>
        </Grid>
      </Container>

      <Container mb={100}>
        <ItemCard
          color={itemCardData.color}
          company={itemCardData.company}
          image={itemCardData.image}
          space={itemCardData.space}
          title={itemCardData.title}
          date={itemCardData.date}
          price={itemCardData.price}
          key={itemCardData.title}
          sale={itemCardData.sale}
          status={itemCardData.status}
        />
      </Container>

      <Container>
        <Grid>
          {SimpleStatCardData.map((item, key) => (
            <Grid.Col span={3}>
              <SimpleStateCard key={key} title={item.title} value={item.value} type={item.type} />
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
