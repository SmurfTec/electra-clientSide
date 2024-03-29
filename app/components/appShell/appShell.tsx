import { Only } from '@elektra/customComponents';
import { ActionIcon, Affix, Container, Stack, Text, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { ReactNode } from 'react';
import { ShoppingCartPlus } from 'tabler-icons-react';

type AppShellProps = {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

export const AppShell = ({ header, children, footer }: AppShellProps) => {
  const phone = useMediaQuery('(max-width: 800px)',false);
  return (
    <>
      {header}
      <Container size={1100}>{children}</Container>
      {footer}
      {/* <Only when={!phone}> */}
      <Affix position={{ bottom: phone ? rem(100)  :rem(30), right: rem(20) }}>
        <ActionIcon color="blue" radius="xl" size={60} variant="filled" component={NextLink} href="/selling-search">
          <Stack align='center' spacing={0}>
          <ShoppingCartPlus size={20} />
          <Text size={10} className="font-medium text-white">
            List Item
          </Text>
          </Stack>
        </ActionIcon>
      </Affix>
      {/* </Only> */}
    </>
  );
};
