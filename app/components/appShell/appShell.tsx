import { ActionIcon, Affix, Container, Stack, Text, rem } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ReactNode } from 'react';
import { ShoppingCartPlus } from 'tabler-icons-react';

type AppShellProps = {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

export const AppShell = ({ header, children, footer }: AppShellProps) => {
  return (
    <>
      {header}
      <Container size={1300}>{children}</Container>
      {footer}
      <Affix position={{ bottom: rem(70), right: rem(20) }}>
        <ActionIcon color="blue" radius="xl" size={60} variant="filled" component={NextLink} href="/selling-search">
          <Stack align='center' spacing={0}>
          <ShoppingCartPlus size={20} />
          <Text size={10} className="font-medium text-white">
            List Item
          </Text>
          </Stack>
        </ActionIcon>
      </Affix>
    </>
  );
};
