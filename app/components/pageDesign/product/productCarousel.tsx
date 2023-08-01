import { baseURL } from '@elektra/customComponents';
import { ImageProps } from '@elektra/types';
import { Carousel, Embla } from '@mantine/carousel';
import { ActionIcon, Center, Group, Image, clsx, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
// const carouseldata = [
//   '/images/brands/iphone.png',
//   '/images/carousel/iphoneblack.png',
//   '/images/brands/iphone.png',
//   '/images/carousel/iphonefront.png',
//   '/images/brands/iphone.png',
// ];

type productCarousel = {
  className?: string;
  images: ImageProps[];
};

export const ProductCarousel = ({ className, images }: productCarousel) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [emblaThumb, setEmblaThumb] = useState<Embla | null>(null);
  const { classes } = useStyles();
  const matches = useMediaQuery('(max-width: 800px)', false);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumb) return;
      embla.scrollTo(index);
    },
    [embla, emblaThumb]
  );
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
    <div className="px-2">
      <Center>
        <Carousel
          // maw={matches ? 350 : 650}
          // maw={500}
          loop
          // slideGap={100}
          nextControlIcon={<Image fit="contain" alt="" src={'/images/carousel/ArrowRight.png'} className="w-full" />}
          previousControlIcon={<Image fit="contain" alt="" src={'/images/carousel/ArrowLeft.png'} className="w-full" />}
          withIndicators
          classNames={classes}
          slideSize={'100%'}
          slidesToScroll={1}
          // height={450}
          getEmblaApi={setEmbla}
          initialSlide={2}
        >
          {images?.map((item, index) => (
            <Carousel.Slide key={index}>
              <Center>
                <Image src={baseURL + '/' + item.filename} alt="product" />
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Center>
      <Carousel
        //maw={510}
        className="-mt-10 md:mt-2"
        draggable={false}
        withIndicators={false}
        withControls={false}
        height={50}
        getEmblaApi={setEmblaThumb}
      >
        <Group position="center" spacing={10} className={clsx(className, ' md:ml-24')}>
          {images?.map((item, index) => (
            <ActionIcon
              radius={0}
              size={50}
              bg="rgba(222, 222, 222, 1)"
              className={
                selectedIndex === index ? ' hover:bg-gray-300 border-solid border-2 border-black' : ' hover:bg-gray-300'
              }
              onClick={() => onThumbClick(index)}
              key={index}
            >
              <Image src={baseURL + '/' + item.filename} alt="product" fit="none" />
            </ActionIcon>
          ))}
        </Group>
      </Carousel>
    </div>
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
