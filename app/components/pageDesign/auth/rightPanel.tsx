import  Image   from 'next/image';
import { createStyles, Image as MantineImage, Text } from '@mantine/core';
import { Fragment } from 'react';
import { useMediaQuery } from '@mantine/hooks';

export const RightPanel = () => {
  const { classes } = useStyles();
  const phone = useMediaQuery('(max-width: 600px)');
  return (
    <div className='h-[50vh] sm:h-auto '>
      <Image alt="background-image" className="m-0 h-screen" layout="fill" src="/images/auth/loginBG.png" />
      <div className={classes.centerAlign}>
        <MantineImage alt="center-image" src="/images/auth/loginCenter.png" />
      </div>
      <div>
        <Image
          alt="top-image"
          height="150px"
          width="150px"
          className={classes.topAlign}
          src="/images/auth/loginTopLeft.png"
        />
      </div>
      <div className="text-center absolute sm:left-1/2 bottom-1 sm:bottom-8 sm:-translate-x-1/2 -translate-y-1/2">
        <Text className="font-bold mb-2" size={phone?16:"xl"} color="white">
          Buy the best items on our site.
        </Text>
        <Text size="xs" color="#B4B4B4"className='px-12 sm:px-0'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec molestie dui, a consequat magna.
        </Text>
      </div>
    </div>
  );
};

export const useStyles = createStyles((theme) => ({
  centerAlign: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  topAlign: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  bottomAlign: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '3%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
