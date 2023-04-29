import { useStylesforGlobal } from '@elektra/customComponents';
import { Carousel, CarouselProps } from '@mantine/carousel';
import { Button, Group, Image, Text } from '@mantine/core';
import emblaCarouselAutoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { BannerCarousel } from './bannerCarousel';



export function FooterProductCarousel({ carouselData, ...rest }: BannerCarousel) {
  const [value, setValue] = useState(0);
  const { classes } = useStylesforGlobal();
  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  return (
    <div>
      <Carousel
        withIndicators
        height={600}
        slideGap="md"
        loop={true}
        align="start"
        slidesToScroll={1}
        dragFree
        plugins={[autoplay.current]}
        withKeyboardEvents
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        onSlideChange={(index) => {
          carouselData.length === index + 1 ? setValue(0) : setValue(index + 1);
        }}
        {...rest}
      >
        {carouselData.map((item, index) => {
          return (
            <Carousel.Slide key={index}>
              <Image
                height={index === value ? '500px' : '300px'}
                mt={index === value ? '0' : '70px'}
                src={item.imgSrc}
                alt="carousel"
              />
              <Group position="center">
                {item.title && (
                  <>
                    <Text size="xl">{item.title}</Text>{' '}
                    <Button
                      leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
                      variant="outline"
                      classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
                    />
                  </>
                )}
              </Group>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}
