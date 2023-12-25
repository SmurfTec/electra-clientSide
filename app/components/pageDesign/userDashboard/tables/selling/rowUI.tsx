import { ActionIcon, Badge, Button, Grid, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { CellContext } from '@tanstack/react-table';
import { CircleCheck, CircleX, Pencil } from 'tabler-icons-react';
import { Modal, http } from '@elektra/customComponents';
import { useSelector } from 'react-redux';
import { RootState } from '@elektra/store';

import { useUpdateAskModal } from '@elektra/hooks/modal/useUpdateAskModal';
import { useUpdateListingModal } from '@elektra/hooks/modal/useUpdateListingModal';
import { useConfirmationModal } from '@elektra/hooks/modal/useConfirmationModal';
import { useState } from 'react';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';
import { useRouter } from 'next/router';

export function ActiveAskRow<T extends { id: string | number; askPrice: string }>({
  row,
  cell,
}: CellContext<T, unknown>) {
  const product = useSelector((state: RootState) => state.entities.sellingOrders.list.sellingAsks.asks).find(
    (item: any) => {
      return item.id === row.original.id;
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [confirmationModal, isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] =
    useConfirmationModal({
      highestOffer: product?.highest_bid,
      onConfirm: () => handleSell(row.original.id),
      onCancel: () => closeConfirmationModal(),
      isLoading,
      error,
    });

  const handleSellNowClick = () => {
    openConfirmationModal();
  };

  const [askUpdateModal, askUpdateOpened, askUpdateHandler] = useUpdateAskModal(product);

  const handleSell = async (id: any) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await http.request({
        url: `/products/${id}/sell`,
        method: 'POST',
      });

      if (res.status !== 200) {
        setError(res?.errorPayload?.message);
        return;
      }
      closeConfirmationModal();
    } catch (err) {
      setError('An error occurred while selling the product.');
    } finally {
      setIsLoading(false);
    }
  };

  switch (cell.column.id) {
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
              // component={NextLink}
              // onClick={() => handleSell(row.original.id)}
              // href={``}
              // href={`/userdashboard?tab=purchasing`}
              onClick={handleSellNowClick}
              loading={isLoading}
            >
              Sell Now
            </Button>
            <Modal
              title="Confirm Sale"
              size={500}
              children={confirmationModal}
              onClose={closeConfirmationModal}
              open={isConfirmationModalOpen}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Modal
              title="Update Ask"
              size={500}
              children={askUpdateModal}
              onClose={askUpdateHandler.close}
              open={askUpdateOpened}
            />
            <ActionIcon onClick={askUpdateHandler.open}>
              <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}

export function ActiveListingRow<T extends { id: string | number; askPrice: string }>({
  row,
  cell,
}: CellContext<T, unknown>) {
  const product = useSelector((state: RootState) => state.entities.sellingOrders.list.sellingListings.listings).find(
    (item: any) => {
      return item.id === row.original.id;
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [confirmationModal, isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] =
    useConfirmationModal({
      highestOffer: product?.highest_offer,
      onConfirm: () => handleSell(row.original.id),
      onCancel: () => closeConfirmationModal(),
      isLoading,
      error,
    });

  const handleSellNowClick = () => {
    openConfirmationModal();
  };

  const [listingUpdateModal, listingUpdateOpened, listingUpdateHandler] = useUpdateListingModal(product);
  // const handleSell = async (id: any) => {
  //   const res = await http.request({
  //     url: `/products/${product?.product_data.id}/sell`,
  //     method: 'POST',
  //   });
  // };

  const router = useRouter();
  const [sellSuccessModal, sellSuccessModalOpened, sellSuccessModalHandler] = useInfoModal({
    title: 'Success!',
    description: 'You have successfully sold the item, go to your Dashboard',
    actions: (
      <Button
        onClick={() => router.push('/userdashboard?tab=selling&subtab=pending')}
        size={'lg'}
        variant="outline"
        className="w-1/3 mt-2 text-sm font-medium"
        styles={{
          root: {
            padding: 'unset',
            borderRadius: '35px',
            border: '1px solid',
          },
        }}
      >
        Go to Dashboard
      </Button>
    ),
  });

  const handleSell = async (id: any) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await http.request({
        url: `/listing/${id}/sell`,
        method: 'POST',
      });

      if (res.status !== 200) {
        setError(res?.errorPayload?.message);
        return;
      }
      closeConfirmationModal();
      sellSuccessModalHandler.open();
    } catch (err) {
      setError('An error occurred while selling the product.');
    } finally {
      setIsLoading(false);
    }
  };

  switch (cell.column.id) {
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
              // component={NextLink}
              // onClick={() => handleSell(row.original.id)}
              // href={`/userdashboard?tab=purchasing`}
              onClick={handleSellNowClick}
            >
              Sell Now
            </Button>
            <Modal
              title="Confirm Sale"
              size={500}
              children={confirmationModal}
              onClose={closeConfirmationModal}
              open={isConfirmationModalOpen}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Modal
              title="Update Listing"
              size={500}
              children={listingUpdateModal}
              onClose={listingUpdateHandler.close}
              open={listingUpdateOpened}
            />
            <ActionIcon onClick={listingUpdateHandler.open}>
              <Pencil color="white" fill="black" size="1rem" strokeWidth={1} />
            </ActionIcon>
          </Grid.Col>
          <Modal children={sellSuccessModal} onClose={sellSuccessModalHandler.close} open={sellSuccessModalOpened} />
        </Grid>
      );
    default:
      return <Text color="inherit">{cell.getValue() as string}</Text>;
  }
}

export function ActiveSimpleRow<T extends { id: string | number }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;
  const product = useSelector((state: RootState) => state.entities.sellingOrders.list.sellingActiveOrders.asks).find(
    (item: any) => {
      return item.product.id === row.original.id;
    }
  );
  const [listingEditModal, listingEditOpened, listingEditHandler] = useUpdateListingModal(product);

  const handleSell = async (id: any) => {
    console.log('object');
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
