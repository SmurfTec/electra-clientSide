import { Carousel } from '@elektra/ui';
import { IHerocomponentProps } from '@elektra/ui';

const data:Array<IHerocomponentProps> = [
  {
    backgroundImage: '/images/img.png',
    title: 'New Iphone 14',
    subTitle:" Packages",
    href:"/"
  },
  {
    backgroundImage: '/images/img.png',
    title: 'New Iphone 12',
    subTitle:" Packages",
    href:"/"
  },
];

export function HeroImage() {
  return <div><Carousel hero={data} delay={4000} /></div>;
}

export default HeroImage;
