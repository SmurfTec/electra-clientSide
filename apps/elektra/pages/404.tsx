import { Button, Container, createStyles, Group, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ArrowNarrowLeft } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 300,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: 'dark',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Barlow, Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 36,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function NotFoundTitle() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title mt={30} className={classes.title}>Page not found!</Title>
      <Group position="center" mt={30} >
        <Button
          leftIcon={<ArrowNarrowLeft size={38} strokeWidth={1} color={'black'} />}
          className="rounded-3xl hover:bg-transparent"
          component={NextLink}
          href="/"
          variant="outline"
          size="md"
        >
          Go back
        </Button>
      </Group>
    </Container>
  );
}
