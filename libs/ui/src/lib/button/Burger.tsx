import { BurgerProps, Burger as MBurger } from '@mantine/core';

import { forwardRef } from 'react';

export const BurgerRef = forwardRef<HTMLButtonElement, BurgerProps>(
  (props, ref) => {
    return <MBurger ref={ref} {...props} />;
  }
);

