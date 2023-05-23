import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { IHerocomponentProps } from './hero';
import { useRouter } from 'next/router';

const data: Array<IHerocomponentProps> = [
  {
    backgroundImage: '/images/img.png',
    title: 'New Iphone 14',
    subTitle: ' Packages',
    href: '/shop',
  },
  {
    backgroundImage: '/images/img.png',
    title: 'New Iphone 12',
    subTitle: ' Packages',
    href: '/shop',
  },
];

export function HeroImage() {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const router = useRouter()
  return (
    <Carousel
      plugins={[autoplay.current]}
      loop={false}
      withIndicators={true}
      withControls={false}
      // height={'50vh'}
      styles={{
        indicator: {
          width: 10,
          height: 10,
          borderRadius: 'unset',
          transition: 'width 250ms ease',
          '&[data-active]': {
            width: 10,
            background: 'gray',
          },
        },
        indicators: {
          left: 40,
          right: 'unset',
        },
      }}
      className="w-full"
    >
      {data.map((item, index) => (
        <Carousel.Slide className='cursor-pointer' onClick={() => router.push("/shop")} key={index}>
          {/* <Herocomponent
            backgroundImage={item.backgroundImage}
            title={item.title}
            subTitle={item.subTitle}
            href={item.href}
          /> */}
          <Image alt="background-image" src={item.backgroundImage} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default HeroImage;
