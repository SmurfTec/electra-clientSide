import { HoverCard as MTHoverCard, HoverCardProps as MTHoverCardProps } from '@mantine/core';
import { ReactNode } from 'react';

type HoverCardProps = {
  target: ReactNode;
  children: ReactNode;
} & MTHoverCardProps;

export const HoverCard = ({ target, children, ...rest }: HoverCardProps) => {
  return (
    <MTHoverCard
      shadow={undefined}
      radius={0}
      position="bottom-end"
      withinPortal={true}
      keepMounted={false}
      styles={{
        dropdown: {
          width: '100% !important',
          backgroundColor: '#E8E8E8 !important',
        },
      }}
      {...rest}
    >
      <MTHoverCard.Target>{target}</MTHoverCard.Target>
      <MTHoverCard.Dropdown>{children}</MTHoverCard.Dropdown>
    </MTHoverCard>
  );
};
