import { Carousel, Embla } from '@mantine/carousel';
import { ActionIcon, Center, Flex, Group, Image, clsx, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
const carouseldata = [
  '/images/brands/iphone.png',
  '/images/carousel/iphoneblack.png',
  '/images/brands/iphone.png',
  '/images/carousel/iphonefront.png',
  '/images/brands/iphone.png',
];
export const ProductCarousel = ({className}:{className?:string}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [emblaThumb, setEmblaThumb] = useState<Embla | null>(null);
  const { classes } = useStyles();
  const matches = useMediaQuery('(max-width: 800px)',false);

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
    <div className="ml-10 md:mr-32 mr-4">
      <Carousel
        maw={matches?350:650}
        loop
        slideGap={100}
        nextControlIcon={<Image fit="contain" alt="" src={'/images/carousel/ArrowRight.png'} className="w-full" />}
        previousControlIcon={<Image fit="contain" alt="" src={'/images/carousel/ArrowLeft.png'} className="w-full" />}
        withIndicators
        classNames={classes}
        height={450}
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        {carouseldata.map((item, index) => (
          <Carousel.Slide key={index}>
            <Center>
              <Image src={item} alt="product" fit='contain' />
            </Center>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Carousel
        //maw={510}
        className='-mt-16 md:mt-5'
        draggable={false}
        withIndicators={false}
        withControls={false}
        height={50}
        getEmblaApi={setEmblaThumb}
      >
        <Group position='center' spacing={10} className={clsx(className,' md:ml-24')}>
          {carouseldata.map((item, index) => (
            <ActionIcon
              radius={0}
              size={50}
              bg="rgba(222, 222, 222, 1)"
              className={
                selectedIndex === index
                  ? ' hover:bg-gray-300 border-solid border-2 border-black'
                  : ' hover:bg-gray-300'
              }
              onClick={() => onThumbClick(index)}
              key={index}
            >
              <Image src={item} alt="product" fit="contain" />
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
