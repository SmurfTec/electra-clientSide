import  Image   from 'next/image';
import { createStyles, Image as MantineImage, Text } from '@mantine/core';
import { Fragment } from 'react';

export const RightPanel = () => {
  const { classes } = useStyles();
  return (
    <Fragment>
      <Image alt="background-image" className="m-0 h-screen" layout="fill" src="/images/auth/loginBG.png" />
      <div className={classes.centerAlign}>
        <Image alt="center-image" src="/images/auth/loginCenter.png" />
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
      <div className={classes.bottomAlign}>
        <Text className="font-bold mb-2" size="xl" color="white">
          Buy the best items on our site.
        </Text>
        <Text size="xs" color="white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec molestie dui, a consequat magna.
        </Text>
      </div>
    </Fragment>
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
