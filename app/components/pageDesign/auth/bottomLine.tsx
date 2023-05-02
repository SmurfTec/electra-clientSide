import { Text } from '@mantine/core';
import { NextLink } from '@mantine/next';

export const BottomLine = () => {
  return (
    <div className="space-x-4">
      <Text size={'sm'} component={NextLink} href="/" className="inline-block" color="dark">
        Privacy Policy
      </Text>
      <Text size={'sm'} component={NextLink} href="/contact" className="inline-block" color="dark">
        Help Center
      </Text>
      <Text size={'sm'} className="inline-block" color="dark">
        .
      </Text>
      <Text size={'sm'} component={NextLink} href="/how-it-works" className="inline-block" color="dark">
        About
      </Text>
    </div>
  );
};
