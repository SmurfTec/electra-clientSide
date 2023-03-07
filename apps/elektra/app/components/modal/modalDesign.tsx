import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const ModalDesign = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        styles={{
          modal: {
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: 'unset',
          },
          close: {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: 'unset',
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
            },
          },
        }}
      ></Modal>
      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
};
