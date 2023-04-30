import { Carousel, Embla } from '@mantine/carousel';
import { Button, Center, Image, Stack, Text, createStyles } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
const carouseldata = [
  '/images/carousel/mouse.png',
  '/images/carousel/headphone.png',
  '/images/carousel/ram.png',
  '/images/carousel/iphoneImage.png',
];
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
    imgsrc: '/images/carousel/iphoneImage.png',
    subimgs: [
      '/images/carousel/iphoneImage.png',
      '/images/carousel/iphoneImage.png',
      '/images/carousel/iphoneImage.png',
    ],
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
        maw={1200}
        loop
        slideGap={100}
        nextControlIcon={
          <div className="-mt-[15rem] bg-transparent">
            <Image src={'/images/carousel/VectorArrowRight.png '} fit="contain" />
          </div>
        }
        previousControlIcon={
          <div className="-mt-[15rem] bg-transparent">
            <Image src={'/images/carousel/VectorArrowLeft.png '} fit="contain" />
          </div>
        }
        withIndicators={false}
        classNames={classes}
        height={450}
        slideSize="43.3%"
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        {carosuelData.map((item, index) => (
          <Carousel.Slide key={index}>
            <Center>
              <Image src={item.imgsrc} alt="product" fit="contain" width={500} height={450} />
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
      <Text bg={'rgba(60, 130, 214, 1)'} className="text-white px-6">
        Used Starting at $187
      </Text>
      <Center inline className="space-x-3 my-4">
        {carosuelData[selectedIndex].subimgs.map((item, index) => (
          <Center className="" mah={50} maw={50} key={index}>
            <Image src={item} alt="product" fit="contain" />
          </Center>
        ))}
      </Center>

      <Button className="font-light text-base">View Product</Button>
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
