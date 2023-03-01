import { Image, ImageProps } from '@mantine/core';

import { useRef } from 'react';

export const MantineImage = (props: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  return <Image imageRef={imageRef} ref={rootRef} {...props} />;
};

MantineImage.displayName = 'MantineImage';
MantineImage.defaultProps = {};

export type { ImageProps as MantineImageProps };
export default MantineImage;
