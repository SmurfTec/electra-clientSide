import { Carousel, Embla } from '@mantine/carousel';
import { Button, Center, Image, Stack, Text, createStyles } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useCallback, useEffect, useState } from 'react';
const carosuelData = [
  {
    imgsrc: '/images/carousel/mouse.png',
    subimgs: ['/images/carousel/mouse.png', '/images/carousel/mouse.png', '/images/carousel/mouse.png'],
  },
  {
    imgsrc: '/images/carousel/ram.png',
    subimgs: ['/images/carousel/ram.png', '/images/carousel/ram.png', '/images/carousel/ram.png'],
  },
  {
    imgsrc: '/images/carousel/headphone.png',
    subimgs: ['/images/carousel/headphone.png', '/images/carousel/headphone.png', '/images/carousel/headphone.png'],
  },
  {
    imgsrc: '/images/brands/iphone.png',
    subimgs: [
      '/images/brands/iphone.png','/images/brands/iphone.png','/images/brands/iphone.png',],
  },
];
export const FooterProductCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const { classes } = useStyles();

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
  }, [embla, onSelect]);
  return (
    <Stack align="center">
      <Carousel
        maw={"98vw"}
        loop
        // slideGap={}
        nextControlIcon={
          <div className="-mt-[25rem] bg-transparent">
            <Image alt="arrow" className='h-16 w-16 sm:h-0 sm:w-0' src={'/images/carousel/VectorArrowRight.png '} fit="contain" />
          </div>
        }
        previousControlIcon={
          <div className="-mt-[25rem] bg-transparent">
            <Image alt="arrow" className='h-16 w-16 sm:h-0 sm:w-0' src={'/images/carousel/VectorArrowLeft.png '} fit="contain" />
          </div>
        }
        withIndicators={false}
        classNames={classes}
        
        height={350}
        slideSize="33.33%"
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        {carosuelData.map((item, index) => (
          <Carousel.Slide key={index}>
            <Center>
              <Image src={item.imgsrc} alt="product" fit="contain" height={350} width={"100%"} />
            </Center>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Text size={16} className="font-medium">
        Starting as low as
      </Text>
      <Text size={40} className="font-semibold text-black">
        $245
      </Text>
      <Text component={NextLink} href="/shop" bg={'rgba(60, 130, 214, 1)'} className="text-white px-6 cursor-pointer">
        Used Starting at $187
      </Text>
      <Center inline className="space-x-3 my-4">
        {carosuelData[selectedIndex].subimgs.map((item, index) => (
          <Center className="" mah={50} maw={50} key={index}>
            <Image src={item} alt="product" fit="contain" />
          </Center>
        ))}
      </Center>

      <Button component={NextLink} href="/product-detail" className="font-light text-base">View Product</Button>
    </Stack>
  );
};
const useStyles = createStyles((theme) => ({
  indicator: {
    width: 7,
    height: 7,
    margin: 2,
    borderRadius: '10px',
    transition: 'width 250ms ease',
    background: '#D9D9D9',
    '&[data-active]': {
      width: 7,
      background: 'black',
    },
  },
  indicators: {
    position: 'absolute',
    bottom: '0px',
    top: '0px',
    left: '-25px',
    [theme.fn.smallerThan(810)]: {
      left: '-13px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  control: {
    border: 'unset',
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: 'transparent',
  },
}));
