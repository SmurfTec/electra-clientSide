import { Carousel, Embla } from '@mantine/carousel';
import { ActionIcon, Center, Image, createStyles } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
const carouseldata = [
  '/images/carousel/iphoneImage.png',
  '/images/carousel/iphoneblack.png',
  '/images/carousel/iphoneImage.png',
  '/images/carousel/iphonefront.png',
  '/images/carousel/iphoneImage.png',
];
export const ProductCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [emblaThumb, setEmblaThumb] = useState<Embla | null>(null);
  const { classes } = useStyles();

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
    //emblaThumb.scrollTo(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
  }, [embla, onSelect]);
  return (
    <div>
      <Carousel
        maw={650}
        loop
        slideGap={100}
        nextControlIcon={<Image fit="contain" src={'/images/carousel/ArrowRight.png'} className="w-full" />}
        previousControlIcon={<Image fit="contain" src={'/images/carousel/ArrowLeft.png'} className="w-full" />}
        withIndicators
        classNames={classes}
        height={450}
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        {carouseldata.map((item, index) => (
          <Carousel.Slide key={index}>
            <Center>
              <Image src={item} alt="product" width={500} height={500} />
            </Center>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Carousel
        maw={510}
        mt={50}
        draggable={false}
        withIndicators={false}
        withControls={false}
        height={50}
        getEmblaApi={setEmblaThumb}
      >
        {carouseldata.map((item, index) => (
          <Center key={index}>
            <ActionIcon
              radius={0}
              size={50}
              bg="rgba(222, 222, 222, 1)"
              className={
                selectedIndex === index
                  ? 'mr-2 hover:bg-gray-300 border-solid border-2 border-black'
                  : 'mr-2 hover:bg-gray-300'
              }
              onClick={() => onThumbClick(index)}
              key={index}
            >
              <Image src={item} alt="product" fit="contain" />
            </ActionIcon>
          </Center>
        ))}
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
