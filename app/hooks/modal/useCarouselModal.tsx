import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Carousel } from 'react-responsive-carousel';
const imageData = [
  '/images/carousel/iphone.png',
  '/images/carousel/iphone.png',
  '/images/carousel/iphone.png',
  '/images/carousel/iphone.png',
];
export const useCarouselModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);
  const phone = useMediaQuery('(max-width: 600px)',false);
  const Modal = (
    <div className="truncate">
      <Carousel
        centerMode={true}
        centerSlidePercentage={phone?150:50}
        dynamicHeight={false}
        axis="horizontal"
        showStatus={false}
        infiniteLoop
        showArrows={false}
      >
        {imageData.map((image,index) => (
          <div key={index}>
            <img alt='img' src={image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
  return [Modal, opened, { open, close }];
};
