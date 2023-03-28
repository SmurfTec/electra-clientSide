import { NextImage } from '@elektra/ui';
import { Carousel } from '@mantine/carousel';
import { Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const imageData = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
];

export const useCarouselModal = (): [React.ReactNode, boolean, { open: () => void; close: () => void }] => {
  const [opened, { open, close }] = useDisclosure(false);

  const Modal = (
    <>
      {/* <Carousel withIndicators height="100%" sx={{ flex: 1 }}>
          <Carousel.Slide>1</Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
        </Carousel> */}

      <div className="text-center">
        <Carousel slideSize="66.666%" slideGap="xl"  align="center" maw="100%" loop>
          {imageData.map((item, key) => (
            <Carousel.Slide key={key}>
              <NextImage width="500px" height="500px" src={item} />
            </Carousel.Slide>
          ))}
        </Carousel>
        <Group position='center'>    
        <Carousel slideSize="33.333333%" align="center" maw="30%" slideGap="md" withControls={false} loop>
          {imageData.map((item, key) => (
            <Carousel.Slide key={key}>
              <Image fit="contain" src={item} />
            </Carousel.Slide>
          ))}
        </Carousel>
        </Group>
      </div>
    </>
  );
  return [Modal, opened, { open, close }];
};
