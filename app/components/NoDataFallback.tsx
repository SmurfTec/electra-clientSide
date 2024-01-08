import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, createStyles, Group, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ArrowNarrowLeft } from 'tabler-icons-react';

interface NoDataFallbackProps {
  message: string;
  redirectPath: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: 'center',
  },

  title: {
    fontFamily: `Barlow, Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    fontSize: 36,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },
}));

export default function NoDataFallback({ message, redirectPath }: NoDataFallbackProps) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <Title className={classes.title}>{message}</Title>
      <Group position="center" mt={30}>
        <Button
          leftIcon={<ArrowNarrowLeft size={38} strokeWidth={1} color={'black'} />}
          className="rounded-3xl hover:bg-transparent"
          component={NextLink}
          href={redirectPath}
          variant="outline"
          size="md"
        >
          Go Back
        </Button>
      </Group>
    </Container>
  );
}
