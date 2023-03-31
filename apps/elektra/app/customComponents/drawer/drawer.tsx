import { Divider, MantineNumberSize, Drawer as MantineDrawer,DrawerProps as MantineDrawerProps } from '@mantine/core';
import { ReactNode } from 'react';

type DrawerProps = {
  title?: string;
  position?: 'top' | 'left'| 'right' | 'bottom';
  titlePosition?: 'center' | 'left' ;
  children: ReactNode;
  size?: MantineNumberSize;
  open: boolean;
  className?: string;
  onClose: () => void;
} & Omit<MantineDrawerProps,'opened'>;

export const Drawer = ({ title,size=550, children, open, onClose,className ,titlePosition='left',position='right',...rest }: DrawerProps) => {
  return (
    <>
      <MantineDrawer.Root  keepMounted={false} position={position}  size={size} opened={open} onClose={onClose} {...rest}>
        <MantineDrawer.Overlay />
        <MantineDrawer.Content className="rounded-none">
          <MantineDrawer.Header sx={{zIndex:100}}  className={title ? 'h-[75px]' : ''}>
            <MantineDrawer.Title className={titlePosition==='center'?"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg ":'font-bold text-lg '}>
              {title}
            </MantineDrawer.Title>
          </MantineDrawer.Header>
          {title && <Divider  />}
          <MantineDrawer.Body className={className}>{children}</MantineDrawer.Body>
        </MantineDrawer.Content>
      </MantineDrawer.Root>
    </>
  );
};
