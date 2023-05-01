import { Modal } from '@elektra/customComponents';
import { useRequestItemModal } from '@elektra/hooks';
import { Button, createStyles, Image, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';

export default function RequestItem() {
  const { classes } = useStyles();
  const [RequestModal, requestOpened, requestHandler] = useRequestItemModal();
  return (
    <Stack align="center" className="py-24">
      <Image alt='' mah={100} maw={100} src={'/images/plainbox.png'} />
      <Title order={4} className="font-semibold">
        Requesting product to be added
      </Title>
      <TextInput placeholder='Product Name' size={'lg'} classNames={{ input: classes.input }} />
      <Textarea placeholder='Description' classNames={{ input: classes.areaInput }}/>
      <Button
        rightIcon={<ArrowUpRight size={38} strokeWidth={1.2} color={'white'} />}
        size="lg"
        onClick={requestHandler.open}
        classNames={{ root: classes.blueButton }}
      >
        REQUEST
      </Button>
      <Modal children={RequestModal} onClose={requestHandler.close} open={requestOpened} />
      <Button size="lg" classNames={{ root: classes.grayButton }}>
        NOTIFY ME WHEN PRODUCT IS AVAILABLE
      </Button>
    </Stack>
  );
}

const useStyles = createStyles((theme) => ({
  input: {
    borderRadius: 'unset',
    border: '2px solid black',
    width: '400px',
  },
  areaInput: {
    borderRadius: 'unset',
    border: '2px solid black',
    height:'170px',
    width: '400px',
  },
  grayButton: {
    backgroundColor: '#E6E6E6',
    color: 'black',
    fontSize: '16px',
    width: '400px',
    '&:not([data-disabled]):hover': {
      backgroundColor: '#E6E6E6',
    },
  },
  blueButton: {
    backgroundColor: '#3C82D6',
    width: '400px',
    fontSize: '16px',
    '&:not([data-disabled]):hover': {
      backgroundColor: '#3C82D6',
    },
  },
}));
