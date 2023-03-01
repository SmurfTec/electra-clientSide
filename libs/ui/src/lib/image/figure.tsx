import { MantineImage, MantineImageProps } from './mantineImage';

type FigureProps = MantineImageProps & {
  caption?: React.ReactNode;
};

export function Figure({ caption,className , ...rest }: FigureProps) {
  return (
    <figure className='w-full ml-[-6px]'>
      <MantineImage {...rest}/>
      <figcaption className={className}>{caption}</figcaption>
    </figure>
  );
}
