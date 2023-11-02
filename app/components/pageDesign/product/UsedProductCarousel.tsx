import { baseURL } from '@elektra/customComponents';
import { ImageProps } from '@elektra/types';
import { Carousel, Embla } from '@mantine/carousel';
import { ActionIcon, Center, Group, Image, clsx, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';

type FileWithPath = {
  path?: string;
  // any other properties specific to FileWithPath
};

type Base64Image = string;
type ImageSource = ImageProps | Base64Image | FileWithPath;

type productCarousel = {
  className?: string;
  images: ImageSource[];
};

function isBase64Image(image: ImageSource): image is Base64Image {
  return typeof image === 'string' && image.startsWith('data:image');
}

function isFileWithPath(image: ImageSource): image is FileWithPath {
  return (image as FileWithPath).path !== undefined;
}


export const UsedProductCarousel = ({ className, images }: productCarousel) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [emblaThumb, setEmblaThumb] = useState<Embla | null>(null);
  const { classes } = useStyles();
  const matches = useMediaQuery('(max-width: 800px)', false);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumb) return;
      embla.scrollTo(index);
    },
    [embla, emblaThumb]
  );
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
  }, [embla, onSelect]);

  return (
    <div className="px-2">
      <Center>
        <Carousel
        >
          {images?.map((item, index) => (
            <Carousel.Slide key={index}>
              <Center>
                {isBase64Image(item) ? (
                  <Image src={item} alt="product" />
                ) : isFileWithPath(item) ? (
                  <Image src={item.path} alt="product" />
                ) : (
                  <Image src={baseURL + '/' + item.filename} alt="product" />
                )}
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Center>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  indicator: {
    width: 7,
    height: 7,
    margin: 2,
    borderRadius: '10px',
    transition: 'width 250ms ease',
    background: '#D9D9D9',
    '&[data-active]': {
      width: 7,
      background: 'black',
    },
  },
  indicators: {
    position: 'absolute',
    bottom: '0px',
    top: '0px',
    left: '-25px',
    [theme.fn.smallerThan(810)]: {
      left: '-13px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  control: {
    border: 'unset',
    borderRadius: 'unset',
    boxShadow: 'unset',
    backgroundColor: 'transparent',
  },
}));
