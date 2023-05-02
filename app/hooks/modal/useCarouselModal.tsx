import { useDisclosure } from '@mantine/hooks';
import { Carousel } from 'react-responsive-carousel';
const imageData = [
  '/images/carousel/iphone.png',
  '/images/carousel/iphonehalf.png',
  '/images/carousel/iphoneback.png',
];
export const useCarouselModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <div className="truncate">
      <Carousel
        centerMode={true}
        centerSlidePercentage={50}
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
