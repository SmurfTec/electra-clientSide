import { Carousel } from '@mantine/carousel';
import { Overlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const useCarouselModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <>  
        <Carousel withIndicators height="100%" sx={{ flex: 1 }}>
          <Carousel.Slide>1</Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
        </Carousel>
    </>
  );
  return [Modal, opened, { open, close }];
};
