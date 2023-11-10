import { ActionIcon, Badge, Button, Grid, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { CellContext } from '@tanstack/react-table';
import { CircleCheck, CircleX, Pencil } from 'tabler-icons-react';
import { Modal, http } from '@elektra/customComponents';
import { useSelector } from 'react-redux';
import { RootState } from '@elektra/store';
import { useListingModal } from '@elektra/hooks/modal/useListingModal';
export function ActiveSimpleRow<T extends { id: string | number }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;
  const product = useSelector((state: RootState) => state.entities.sellingOrders.list.sellingActiveOrders.asks).find(
    (item: any) => {
      return item.product.id === row.original.id;
    }
  );

  const [listingEditModal, listingEditOpened, listingEditHandler] = useListingModal(product);

  const handleSell = async (id: any) => {
    const res = await http.request({
      url: `/products/${id}/sell`,
      method: 'POST',
    });
    console.log(res, 'res');
  };
  switch (props.cell.column.id) {
    case 'action':
      return (
        <Grid p={0} m={0}>
          <Grid.Col className="text-right" span={10}>
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
              onClick={() => handleSell(row.original.id)}
              href={`/userdashboard?tab=purchasing`}
            >
              Sell Now
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <Modal
              title="Edit Listing"
              size={500}
              children={listingEditModal}
              onClose={listingEditHandler.close}
              open={listingEditOpened}
            />
            <ActionIcon onClick={listingEditHandler.open}>
              <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
export function PendingSimpleRow<T extends { id: string }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'trackingNo':
      return <Text color="#3C82D6">{cell.getValue() as string}</Text>;
    case 'orderStatus':
      return (
        <Badge
          color={String(cell.getValue()).toLowerCase() === 'shipped' ? 'blue' : 'red'}
          maw={150}
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
          href={`/order-detail/${row.original.id}`}
        >
          View Details
        </Button>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
export function CompletedSimpleRow<T extends { id: string }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'status':
      return cell.getValue() ? (
        <CircleCheck fill={'#3C82D6'} strokeWidth={1} color={'white'} />
      ) : (
        <CircleX fill={'#656565'} strokeWidth={1} color={'white'} />
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
          href={`/order-detail/${row.original.id}`}
        >
          View Details
        </Button>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}
