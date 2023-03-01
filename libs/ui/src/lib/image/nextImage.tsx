import Image  from 'next/image';
import  { ImageProps } from 'next/image';

import React from 'react';

export const NextImage = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return (
    <div ref={ref}>
      <Image {...props} />
    </div>
  );
});

NextImage.displayName = 'NextImage';

export type { ImageProps as NextImageProps  };
export default NextImage;
