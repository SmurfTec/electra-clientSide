import { baseURL } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Carousel } from '@mantine/carousel';
import { Image, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { ArrowNarrowLeft, ArrowNarrowRight } from 'tabler-icons-react';
export const FooterProductCarousel = () => {
  const { classes } = useStyles();
  const medium = useMediaQuery('(max-width: 769px)');
  const phone = useMediaQuery('(max-width: 500px)');
  const carouselData = useSelector((state: RootState) => state.entities.websiteSection.list?.sections)?.find(
    (item) => item.section === 'Carousel'
  )?.images;

  console.log(carouselData);
  return (
    <Carousel
      classNames={classes}
      breakpoints={[
        { maxWidth: 769, slideSize: '50%' },
        { maxWidth: 500, slideSize: '100%' },
      ]}
      withIndicators
      nextControlIcon={<ArrowNarrowRight size={20} color="rgba(17, 17, 17, 1)" />}
      previousControlIcon={<ArrowNarrowLeft size={20} color="rgba(17, 17, 17, 1)" />}
      slideSize="33.333333%"
      slideGap="md"
      align="start"
      slidesToScroll={1}
    >
      {carouselData?.map((item, index) => (
        <Carousel.Slide key={index}>
          <Image src={baseURL + "/" + item.filename} alt="" fit='cover' />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
const useStyles = createStyles((theme) => ({
  indicator: {
    width: 7,
    height: 7,
    margin: 2,
    borderRadius: '10px',
    transition: 'width 250ms ease',
    background: 'rgba(180, 180, 180, 1)',
    '&[data-active]': {
      width: 7,
      background: 'black',
    },
  },
  indicators: {
    bottom: -25,
  },
  controls: {
    justifyContent: 'center',
    gap: 5,
    bottom: -360,
    [theme.fn.smallerThan(1050)]: {
      bottom: -320,
    },
    [theme.fn.smallerThan(900)]: {
      bottom: -300,
    },
    [theme.fn.smallerThan(820)]: {
      bottom: -280,
    },
    [theme.fn.smallerThan(769)]: {
      display: 'none',
    },
  },
  control: {
    border: '2px solid rgba(17, 17, 17, 1)',
    minHeight: 'unset',
    width: 60,
    borderRadius: 30,
    '&[data-inactive]': {
      cursor: 'default',
      border: '2px solid rgba(180, 180, 180, 1)',
    },
  },
}));
