import { Modal, ModalProps } from '@mantine/core';

import React from 'react';

export function withModal<T>(Component: React.ComponentType<T & ModalProps>) {
  return function ModalWrapper(props: T & ModalProps) {
    const {
      opened,
      onClose,
      title,
      zIndex,
      overflow,
      withCloseButton,
      overlayOpacity,
      overlayColor,
      overlayBlur,
      fullScreen,
      radius,
      size = '100%',
      transition,
      transitionDuration,
      exitTransitionDuration,
      transitionTimingFunction,
      closeButtonLabel,
      id,
      shadow,
      padding,
      closeOnClickOutside,
      closeOnEscape,
      trapFocus,
      centered,
      lockScroll,
      target,
      withinPortal,
      withFocusReturn,
      ...rest
    }: ModalProps = props;

    const modalProps = {
      opened,
      onClose,
      title,
      zIndex,
      overflow,
      withCloseButton,
      overlayOpacity,
      overlayColor,
      overlayBlur,
      fullScreen,
      radius,
      size,
      transition,
      transitionDuration,
      exitTransitionDuration,
      transitionTimingFunction,
      closeButtonLabel,
      id,
      shadow,
      padding,
      closeOnClickOutside,
      closeOnEscape,
      trapFocus,
      centered,
      lockScroll,
      target,
      withinPortal,
      withFocusReturn,
    };
    return (
      <Modal {...modalProps}>
        <Component {...(rest as T & ModalProps)} onClose={modalProps.onClose} />
      </Modal>
    );
  };
}
