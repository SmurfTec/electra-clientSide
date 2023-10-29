import { baseURL } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Herocomponent from './hero';

const data = [
  {
    backgroundImage: '/images/carousel/dummy/9.jpeg',
    // backgroundImage: '/images/img.png',
    tabletImage: '/images/carousel/dummy/9.jpeg',
    phoneImage: '/images/carousel/dummy/9.jpeg',
    title: 'New Iphone 14',
    subTitle: ' Packages',
    href: '/shop',
  },
  {
    backgroundImage: '/images/carousel/dummy/11.jpeg',
    tabletImage: '/images/carousel/dummy/11.jpeg',
    phoneImage: '/images/carousel/dummy/11.jpeg',
    title: 'New Iphone 12',
    subTitle: ' Packages',
    href: '/shop',
  },
  {
    backgroundImage: '/images/carousel/dummy/4.jpeg',
    tabletImage: '/images/carousel/dummy/4.jpeg',
    phoneImage: '/images/carousel/dummy/4.jpeg',
    title: 'New Iphone 12',
    subTitle: ' Packages',
    href: '/shop',
  },
];

export function HeroImage() {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const router = useRouter();
  const phone = useMediaQuery('(max-width: 400px)');

  const tablet = useMediaQuery('(max-width: 900px)');

  const carouselData = useSelector((state: RootState) =>
    state.entities.websiteSection.list.sections?.find((item) => item.section === 'carousel')
  );

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
        <Carousel.Slide className="cursor-pointer" onClick={() => router.push('/shop')} key={index}>
          <Herocomponent
            backgroundImage={item.backgroundImage}
            // backgroundImage={}

            href={'/shop'}
          />
          {/* <Image alt="background-image" src={item.backgroundImage} fit='fill' height={phone ? "200px" : undefined} /> */}
        </Carousel.Slide>
      ))}
      {/* {carouselData?.images.map((item, index) => (
        <Carousel.Slide className="cursor-pointer" onClick={() => router.push('/shop')} key={index}>
          <Herocomponent
            backgroundImage={baseURL + '/' + item.filename}
            backgroundImage={}

            href={'/shop'}
          />
          <Image alt="background-image" src={item.backgroundImage} fit='fill' height={phone ? "200px" : undefined} />
        </Carousel.Slide>
      ))} */}
    </Carousel>
  );
}

export default HeroImage;
