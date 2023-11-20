import { Text } from '@mantine/core';
import { NextLink } from '@mantine/next';

export const Logo = () => {
  return (
    <Text component={NextLink} href="/" color="black" className="hidden md:block font-bold md:ml-3">
      Elektra
    </Text>
  );
};
