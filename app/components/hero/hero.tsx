import { Button, createStyles,Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Image from 'next/image';

export interface IHerocomponentProps {
  backgroundImage: string;
  title: string;
  subTitle?: string;
  href: string;
}

export const Herocomponent = ({ backgroundImage, title, subTitle, href }: IHerocomponentProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.parent}>
      <Image
        alt="background-image"
        className={classes.image}
        layout="fill"
        objectFit="cover"
        src={backgroundImage}
      />
      <div className={classes.container}>
        <Title className={classes.title} color="white" order={1}>
          {title}
        </Title>
        {subTitle && (
          <Title className={classes.subtitle} order={1}>
            {subTitle}
          </Title>
        )}
        <div className={classes.controls}>
          <Button component={NextLink} href={href} size="md" uppercase color="blue">
            Shop Today
          </Button>
        </div>
      </div>
    </div>
  );
};

Herocomponent.displayName = 'Herocomponent';

export default Herocomponent;

// component styles

const useStyles = createStyles((theme) => ({
  parent: {
    height: '50vh',
    width: '100%',
    display: 'flex',
  },

  image: {
    filter: 'brightness(1)',
    zIndex: -1,
  },
  container: {
    padding: 20,
    marginLeft: 20,
  },
  title: {
    textAlign: 'left',
    marginTop: '20px',
    lineHeight: 0.8,
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
      width: 'auto',
    },
  },

  subtitle: {
    textAlign: 'left',
    letterSpacing: '2px',
    marginBottom: '30px',
    color: 'white',
    lineHeight: 1.2,
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
      width: 'auto',
    },
  },

  controls: {
    display: 'flex',
    placeSelf: 'center',
    [theme.fn.smallerThan('md')]: {
      float: 'right',
      width: '80%',
      flexDirection: 'column',
    },
  },
}));
