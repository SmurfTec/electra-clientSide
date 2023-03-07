import { Text } from '@mantine/core';
import { NextLink } from '@mantine/next';

export const BottomLine = () => {
  return (
    <div className="mt-16 space-x-4">
      <Text component={NextLink} href="/" className="inline-block" color="dark">
        Privacy Policy
      </Text>
      <Text component={NextLink} href="/" className="inline-block" color="dark">
        Help Center
      </Text>
      <Text className="inline-block" color="dark">
        .
      </Text>
      <Text component={NextLink} href="/" className="inline-block" color="dark">
        About
      </Text>
    </div>
  );
};
