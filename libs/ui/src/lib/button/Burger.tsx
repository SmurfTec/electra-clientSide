import { BurgerProps, Burger as MBurger } from '@mantine/core';

import { forwardRef } from 'react';
import { withTooltip } from '../HOC';

export const BurgerRef = forwardRef<HTMLButtonElement, BurgerProps>(
  (props, ref) => {
    return <MBurger ref={ref} {...props} />;
  }
);

export const Burger = withTooltip(BurgerRef);
