import { HTMLAttributes, forwardRef } from 'react';

import { NextImage } from '../image';

interface ImageButtonProps extends HTMLAttributes<HTMLDivElement> {
  imageSource: string;
  active?: boolean;
}

export const ButtonWithImage = forwardRef<HTMLDivElement, ImageButtonProps>(
  ({ imageSource, active, onClick, className, ...rest }, ref) => {
    return (
      <div className={className} onClick={onClick} ref={ref} {...rest}>
        <NextImage alt={imageSource} className="rounded-full " height={38} src={imageSource} width={38} />
      </div>
    );
  }
);


export type { ImageButtonProps };
