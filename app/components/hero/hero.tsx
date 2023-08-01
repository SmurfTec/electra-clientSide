import { Only } from '@elektra/customComponents';
import { Button, createStyles, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';


export interface IHerocomponentProps {
  backgroundImage: string;
  href: string;
}

export const Herocomponent = ({ backgroundImage, href }: IHerocomponentProps) => {
  // const { classes } = useStyles();

  const matches = useMediaQuery('(max-width: 900px)');
  return (
    <div>
      <Image alt="background-image" src={backgroundImage} height={350} fit="cover" />
      <div>
        <Only when={!matches}>
        <div className="absolute top-1/2 -translate-x-1/2 left-[10.5%]">
          {/* <Button component={NextLink} href={href} size={matches ? 'xs' : 'md'} uppercase color="blue">
            Shop Today
          </Button> */}
        </div>
        </Only>
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
