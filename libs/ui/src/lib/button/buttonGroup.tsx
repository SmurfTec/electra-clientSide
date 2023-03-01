import { Button as MButton, ButtonGroupProps, createPolymorphicComponent } from '@mantine/core';

import { forwardRef } from 'react';

export const ButtonGroup = createPolymorphicComponent<'div', ButtonGroupProps>(
  forwardRef<HTMLDivElement, ButtonGroupProps>(({ children, ...rest }, ref) => {
    return (
      <MButton.Group ref={ref} {...rest}>
        {children}
      </MButton.Group>
    );
  })
);

export default ButtonGroup;
