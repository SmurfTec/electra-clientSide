import { useStylesforGlobal } from '@elektra/customComponents';
import { Button, Center, Group, Image, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Options } from 'react-owl-carousel';
import { ArrowNarrowRight } from 'tabler-icons-react';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

type carouselData = {
  imgSrc: string;
  title?: string;
};

export type BannerCarousel = {
  carouselData: carouselData[];
};

export function BannerCarousel({ carouselData }: BannerCarousel) {
  const { classes } = useStylesforGlobal();

  const options: Options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: false,
    autoplayTimeout: 4500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <OwlCarousel id="product-testimonoals" className="owl-carousel owl-theme" {...options}>
      {carouselData.map((item, index) => {
        return (
          <div key={index} className="item">
            <Center>
              <Image src={item.imgSrc} alt="carousel" />
            </Center>
            <Group position="center" className='-mt-16'>
              {item.title && (
                <>
                  <Text size="xl">{item.title}</Text>
                  <Button
                    leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
                    variant="outline"
                    component={NextLink}
                    href={'/product-detail'}
                    classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
                  />
                </>
              )}
            </Group>
          </div>
        );
      })}
    </OwlCarousel>
  );
}
