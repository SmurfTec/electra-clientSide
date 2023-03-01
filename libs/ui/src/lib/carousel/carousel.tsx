import { Carousel as MCarousel, CarouselProps } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Herocomponent, { IHerocomponentProps } from './hero';
interface ICarouselProps extends CarouselProps {
  delay?: number;
  hero: Array<IHerocomponentProps>;
}
//TODO: need to change indicators
export const Carousel = ({ hero, delay, ...rest }: ICarouselProps) => {
  const autoplay = useRef(Autoplay({ delay: delay ?? 2000 }));
  return (
    <MCarousel
      plugins={[autoplay.current]}
      {...rest}
      styles={{
        indicator: {
          width: 10,
          border:"unset",
          height: 10,
          transition: 'width 250ms ease',
          '&[data-active]': {
            width: 10,
            background: 'gray',
          },
        },
        indicators:{
          left:70,
          right:"unset"
        }
      }}
      className='w-full'
    >
      {hero.map((item, index) => (
        <MCarousel.Slide key={index}>
          <Herocomponent
            backgroundImage={item.backgroundImage}
            title={item.title}
            subTitle={item.subTitle}
            controls={item.controls}
            description={item.description}
          />
        </MCarousel.Slide>
      ))}
    </MCarousel>
  );
};

Carousel.displayName = 'Carousel';
Carousel.defaultProps = {
  loop:false,
  withIndicators:true,
  withControls: false,
  height: '100%',
};
export type { ICarouselProps };

export default Carousel;
