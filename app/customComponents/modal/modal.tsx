import { Divider, MantineNumberSize, Modal as MantineModel,ModalProps as MantineModalProps } from '@mantine/core';
import { ReactNode } from 'react';

type ModalProps = {
  title?: string;
  titlePosition?: 'center' | 'left' ;
  children: ReactNode;
  size?: MantineNumberSize;
  open: boolean;
  className?: string;
  onClose: () => void;
} & Omit<MantineModalProps,'opened'>;

export const Modal = ({ title,size=550, children, open, onClose,className ,titlePosition='center',...rest }: ModalProps) => {
  return (
    <>
      <MantineModel.Root  keepMounted={false}  size={size} opened={open} onClose={onClose} centered {...rest}>
        <MantineModel.Overlay />
        <MantineModel.Content className="rounded-none">
          <MantineModel.Header sx={{zIndex:100}} className={title ? 'h-20' : ''}>
            <MantineModel.Title className={titlePosition==='center'?"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg uppercase":'font-bold text-lg uppercase xs:ml-7'}>
              {title}
            </MantineModel.Title>
            <MantineModel.CloseButton
              className="absolute top-0 right-0 bg-black rounded-none hover:bg-black"
              style={{ color: 'white' }}
              size="md"
            />
          </MantineModel.Header>
          {title && <Divider  />}
          <MantineModel.Body className={className}>{children}</MantineModel.Body>
        </MantineModel.Content>
      </MantineModel.Root>
    </>
  );
};
