import { Carousel } from '@mantine/carousel';
import { Center } from '@mantine/core';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

export const HeaderTopBar = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <Carousel
      withControls
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      styles={(theme) => ({
        controls: {
          justifyContent: 'space-evenly',
          [theme.fn.smallerThan(810)]: {
            justifyContent: 'space-between',
          },
        },
        slide: {
          margin: 'auto',
        },
        control: {
          border: 'unset',
          borderRadius: 'unset',
          boxShadow: 'unset',
          backgroundColor: 'transparent',
          color: 'white',
        },
      })}
      height={40}
      className="bg-black text-white font-normal text-xs md:text-base"
    >
      <Carousel.Slide>
        <Center>Winter Season Sale 50% Off</Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center>Summer Season Sale 50% Off</Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center>Winter Season Sale 70% Off</Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center>Summer Season Sale 70% Off</Center>
      </Carousel.Slide>
    </Carousel>
  );
};
