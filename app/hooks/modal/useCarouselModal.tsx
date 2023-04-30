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
        {imageData.map((image) => (
          <div>
            <img src={image} />
          </div>
        ))}

        {/* <div>
          <img src={imageData[0]} />
        </div>
        <div>
          <img src={imageData[1]} />
        </div>
        <div>
          <img src={imageData[2]} />
        </div>
        <div>
          <img src={imageData[3]} />
        </div> */}
      </Carousel>
    </div>
  );
  return [Modal, opened, { open, close }];
};
