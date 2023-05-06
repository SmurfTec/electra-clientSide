import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Herocomponent, { IHerocomponentProps } from './hero';

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
  const autoplay = useRef(Autoplay({ delay:4000 }));
  return (
    <Carousel
      plugins={[autoplay.current]}
      loop={false}
      withIndicators={true}
      withControls={false}
      height={'50vh'}
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
        <Carousel.Slide key={index}>
          <Herocomponent
            backgroundImage={item.backgroundImage}
            title={item.title}
            subTitle={item.subTitle}
            href={item.href}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default HeroImage;
