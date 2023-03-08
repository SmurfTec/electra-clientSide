import { Divider, MantineNumberSize, Modal as MantineModel } from '@mantine/core';
import { ReactNode } from 'react';

type ModelProps = {
  title?: string;
  children: ReactNode;
  size?: MantineNumberSize;
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ title,size, children, open, onClose,  }: ModelProps) => {
  return (
    <>
      <MantineModel.Root size={size??550} opened={open} onClose={onClose} centered >
        <MantineModel.Overlay />
        <MantineModel.Content className="rounded-none">
          <MantineModel.Header className={title ? 'h-20' : ''}>
            <MantineModel.Title className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg uppercase">
              {title}
            </MantineModel.Title>
            <MantineModel.CloseButton
              className="absolute top-0 right-0 bg-black rounded-none hover:bg-black"
              style={{ color: 'white' }}
              size="md"
            />
          </MantineModel.Header>
          {title && <Divider />}
          <MantineModel.Body>{children}</MantineModel.Body>
        </MantineModel.Content>
      </MantineModel.Root>
    </>
  );
};
