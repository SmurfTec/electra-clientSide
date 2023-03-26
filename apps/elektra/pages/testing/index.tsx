import { CategoryCard, Footer, HeroImage, Modal, ProductCard, useStylesforGlobal } from '@elektra/components';
import { useOfferModel } from '@elektra/hooks';
import { SearchBox } from '@elektra/ui';
import { Carousel } from '@mantine/carousel';
import { Button, createStyles, Group, Image, Text } from '@mantine/core';
import { PageTitle } from 'apps/elektra/app/components/AppTitle';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';

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
const useStyles = createStyles((theme) => ({
  onSlideActive: {
    height: '600px',
  },
  onSlideInActive: {
    height: '300px',
  },
}));

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

      <div className="mt-96">
        <Footer />
      </div>
    </div>
  );
}
