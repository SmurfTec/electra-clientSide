import { createStyles } from '@mantine/core';
import { NextImage } from '../image';
import { Text, Title } from '../text';

export interface IHerocomponentProps {
  backgroundImage: string;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  controls?: React.ReactNode;
}

export const Herocomponent = ({
  backgroundImage,
  title,
  subTitle,
  description,
  controls,
}: IHerocomponentProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.parent}>
      <NextImage
        alt="background-image"
        className={classes.image}
        layout='fill'
        objectFit='cover'
        priority
        src={backgroundImage}
      />
      <div className={classes.container}>
        <Title className={classes.title} order={1}>
          {title}
        </Title>
        {subTitle && (
          <Title className={classes.subtitle} order={1}>
            {subTitle}
          </Title>
        )}
        {description && (
          <Text className={classes.description}>{description}</Text>
        )}
        {controls && <div className={classes.controls}>{controls}</div>}
      </div>
    </div>
  );
};

Herocomponent.displayName = 'Herocomponent';

export default Herocomponent;

// component styles

const useStyles = createStyles((theme) => ({
  parent: {
    height: '40vh',
    width: '100%',
    display: 'flex',
  },

  image: {
    filter: 'brightness(1)',
    zIndex: -1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '5.8rem',
    letterSpacing: '2px',
    marginTop: '20px',
    color: 'white',
    lineHeight: 0.8,
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
      width: 'auto',
    },
  },

  subtitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '5.8rem',
    letterSpacing: '2px',
    marginBottom: '30px',
    color: 'white',
    lineHeight: 1.2,
    [theme.fn.smallerThan('md')]: {
      textAlign: 'center',
      width: 'auto',
    },
  },

  description: {
    display: 'inline-block',
    width: 800,
    color: theme.colors?.[theme.primaryColor][1],
    fontSize: '1.8rem',
    margin: 15,
    [theme.fn.smallerThan('md')]: {
      fontSize: '1.8rem',
      lineHeight: 1.5,
      width: 'auto',
      textAlign: 'center',
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
