import { Modal } from '@elektra/customComponents';
import { useOfferEditModal } from '@elektra/hooks';
import { ActionIcon, Badge, Button, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { CellContext } from '@tanstack/react-table';
import { Pencil } from 'tabler-icons-react';

export function ActiveSimpleRow<T extends { id: string | number  }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;
  const [OfferEditModal, offerEditOpened, offerEditHandler] = useOfferEditModal();

  switch (props.cell.column.id) {
    case 'action':
      return (
        <div>
          <Modal
              title="Edit Offer"
              size={500}
              children={OfferEditModal}
              onClose={offerEditHandler.close}
              open={offerEditOpened}
            />
          <ActionIcon onClick={offerEditHandler.open}>
            <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
          </ActionIcon>
        </div>
      );
    default:
      return <Text color="inherit" className='text-[11px] md:text-sm font-medium'>{cell.getValue() as string}</Text>;
  }
}
export function PendingSimpleRow<T extends { id: string | number  }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'trackingNo':
      return <Text color="#3C82D6">{cell.getValue() as string}</Text>;
    case 'orderStatus':
      return (
        <Badge
          color={String(cell.getValue()).toLowerCase() === 'pending' ? 'blue' : 'red'}
          maw={120}
          radius="sm"
          variant="filled"
        >
          {cell.getValue() as string}
        </Badge>
      );
    case 'action':
      return (
        <Button
          variant="outline"
          styles={{
            root: {
              padding: '0px 10px',

              borderRadius: '30px',
            },
          }}
          radius="xl"
          component={NextLink}
          href={`/order-detail?${row.original.id}`}
        >
          View Details
        </Button>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
export function CompletedSimpleRow<T extends { id: string | number }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'action':
      return (
        <Button
          variant="outline"
          styles={{
            root: {
              padding: '0px 10px',

              borderRadius: '30px',
            },
          }}
          radius="xl"
          component={NextLink}
          href='/order-detail'
        >
          View Details
        </Button>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
