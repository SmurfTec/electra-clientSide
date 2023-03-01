import React, { forwardRef, ReactNode } from 'react';
import { Tooltip, TooltipProps } from '../tooltip';

import { FloatingPosition } from '@mantine/core/lib/Floating';
// import { useTheme } from '../hooks';

type _WithTooltip = {
  tooltip?: ReactNode;
};

type _OmitProps = {
  label: string;
};

export type WithTooltipProps<T> = Omit<T & Omit<TooltipProps, 'children'> & _WithTooltip, keyof _OmitProps>;

export function withTooltip<T>(WrappedComponent: React.ComponentType<T>) {
  const WithTooltip = forwardRef<HTMLDivElement, WithTooltipProps<T>>((props, ref) => {
    // const theme = useTheme();

    const {
      onPositionChange,
      /** Open delay in ms */
      openDelay,
      /** Close delay in ms */
      closeDelay,
      /** Controls opened state */
      opened,
      /** Space between target element and tooltip in px */
      offset,
      /** Determines whether component should have an arrow */
      withArrow = true,
      /** Arrow size in px */
      arrowSize,
      /** Arrow offset in px */
      arrowOffset,
      /** Arrow radius in px */
      arrowRadius,
      /** One of premade transitions ot transition object */
      transition,
      /** Transition duration in ms */
      transitionDuration,
      /** Determines which events will be used to show tooltip */
      events,
      /** useEffect dependencies to force update tooltip position */
      positionDependencies,
      /** Set if tooltip is attached to an inline element */
      inline,

      /** Tooltip position relative to target element (default) or mouse (floating) */
      position = 'bottom' as FloatingPosition,
      /** Key of the prop that should be used to get element ref */
      refProp = 'ref',

      /** Determines whether tooltip should be rendered within Portal */
      withinPortal,
      /** Radius from theme.radius or number to set border-radius in px */
      radius,
      /** Key of theme.colors */
      // color = theme.primaryColor,
      /** Defines whether content should be wrapped on to the next line */
      multiline = true,
      /** Tooltip width in px */
      width,
      /** Tooltip z-index */
      zIndex,
      /** Disables tooltip */
      disabled,

      tooltip,
    } = props;

    const tooltipProperties = {
      onPositionChange,
      /** Open delay in ms */
      openDelay,
      /** Close delay in ms */
      closeDelay,
      /** Controls opened state */
      opened,
      /** Space between target element and tooltip in px */
      offset,
      /** Determines whether component should have an arrow */
      withArrow,
      /** Arrow size in px */
      arrowSize,
      /** Arrow offset in px */
      arrowOffset,
      /** Arrow radius in px */
      arrowRadius,
      /** One of premade transitions ot transition object */
      transition,
      /** Transition duration in ms */
      transitionDuration,
      /** Determines which events will be used to show tooltip */
      events,
      /** useEffect dependencies to force update tooltip position */
      positionDependencies,
      /** Set if tooltip is attached to an inline element */
      inline,

      /** Tooltip position relative to target element (default) or mouse (floating) */
      position,
      /** Key of the prop that should be used to get element ref */
      refProp,

      /** Determines whether tooltip should be rendered within Portal */
      withinPortal,
      /** Radius from theme.radius or number to set border-radius in px */
      radius,
      /** Key of theme.colors */
      // color,
      /** Defines whether content should be wrapped on to the next line */
      multiline,
      /** Tooltip width in px */
      width,
      /** Tooltip z-index */
      zIndex,
      /** Disables tooltip */
      disabled,
      tooltip,
    };

    return tooltip ? (
      <Tooltip label={tooltip} {...tooltipProperties}>
        <WrappedComponent ref={ref} {...(props as T & Omit<TooltipProps, 'children'>)} />
      </Tooltip>
    ) : (
      <WrappedComponent ref={ref} {...(props as T & Omit<TooltipProps, 'children'>)} />
    );
  });
  return WithTooltip;
}
