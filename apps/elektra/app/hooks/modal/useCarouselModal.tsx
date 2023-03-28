import { useDisclosure } from '@mantine/hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const useCarouselModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <>
      <Carousel showArrows={true}>
        <div>
          <img src="/images/carousel/iphonefull.png" />
        </div>
        <div>
          <img src="/images/carousel/iphoneblack.png" />
        </div>
        <div>
          <img src="/images/carousel/iphonefront.png" />
        </div>
        <div>
          <img src="/images/carousel/centerLaptop.png" />
        </div>
      </Carousel>
    </>
  );
  return [Modal, opened, { open, close }];
};
