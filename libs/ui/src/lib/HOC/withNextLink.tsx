import React, { forwardRef } from 'react';

import NextLink from 'next/link';
import { NextLinkProps } from '@mantine/next/lib/NextLink';
import { PolymorphicComponentProps } from '@mantine/utils';

interface _NextLinkProps extends NextLinkProps {
  label: React.ReactNode;
}

type WithNextLinkProps<T extends object> = PolymorphicComponentProps<any, T & _NextLinkProps>;

export const withNextLink = <T extends object>(Component: React.ComponentType<WithNextLinkProps<T>>) => {
  const WithLink = forwardRef<React.Ref<T>, WithNextLinkProps<T>>(({ href, label, component, ...rest }, ref) => {
    return href ? (
      <NextLink href={href} passHref>
        <Component ref={ref} {...(rest as WithNextLinkProps<T>)}>
          {label}
        </Component>
      </NextLink>
    ) : (
      <Component ref={ref} {...(rest as WithNextLinkProps<T>)}>
        {label}
      </Component>
    );
  });
  return WithLink;
};

export default withNextLink;
