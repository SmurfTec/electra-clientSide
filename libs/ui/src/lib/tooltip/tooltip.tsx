import { Tooltip as MTooltip, TooltipProps } from '@mantine/core';

export const Tooltip = ({ children, ...rest }: TooltipProps) => {
  return <MTooltip {...rest}>{children}</MTooltip>;
};

export type { TooltipProps };
Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {};
export default Tooltip;
