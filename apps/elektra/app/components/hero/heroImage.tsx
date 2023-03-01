import { Button, Carousel } from '@elektra/ui';
import { IHerocomponentProps } from '@elektra/ui';

const data:Array<IHerocomponentProps> = [
  {
    backgroundImage: '/images/img.png',
    title: 'New Iphone 14',
    subTitle:" Packages",
    controls: (
      <Button
        component="a"
        href="#services"
        label="Read More"
        size="md"
        uppercase
      />
    ),
  },
  {
    backgroundImage: '/images/img.png',
    title: 'New Iphone 12',
    subTitle:" Packages",
    controls: (
      <Button
        component="a"
        href="#services"
        label="Read More"
        size="md"
        uppercase
      />
    ),
  },
];

export function HeroImage() {
  return <div className='p-20'><Carousel hero={data} delay={4000} /></div>;
}

export default HeroImage;
