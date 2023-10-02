import { SimpleStatCardProps } from '@elektra/components/card';
import { DataTable, Only, tableDataType } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { ActionIcon, Button, Center, Group, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { format } from 'date-fns';
import { useState } from 'react';
import { ArrowDown, Plus } from 'tabler-icons-react';
import { TableHeaderBar } from '../comman';
import { ActiveSimpleRow, CompletedSimpleRow, PendingSimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';
 
export function Selling() {
  const intialLimit = 4;
  const [value, setValue] = useState('active');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchDate, setSearchDate] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState({});
  const [limit, setLimit] = useState(intialLimit);
  const { sellingActiveOrders, sellingCompletedOrders, sellingPendingOrders } = useSelector(
    (state: RootState) => state.entities.sellingOrders.list
  );
 
  const activeTileData: SimpleStatCardProps[] = [
    {
      title: 'No of Listings',
      value: Number(sellingActiveOrders?.askStats?.no_of_listing),
      type: 'N/A',
    },
    {
      title: 'Gross Value',
      value: Number(sellingActiveOrders?.askStats?.gross_value),
      type: '$',
    },
    // {
    //   title: 'Net Value',
    //   value: Number(sellingActiveOrders?.askStats?.net_value),
    //   type: '$',
    // },
  ];

  const pendingTileData: SimpleStatCardProps[] = [
    {
      title: 'Pending Sales',
      value: Number(sellingPendingOrders?.orderStats[0]?.pending_sales),
      type: 'N/A',
    },
    {
      title: 'Gross Value',
      value: Number(sellingPendingOrders?.orderStats[0]?.gross_value_pending),
      type: '$',
    },
    {
      title: 'Net Value',
      value: Number(sellingPendingOrders?.orderStats[0]?.net_value_pending),
      type: '$',
    },
  ];
  const completedTileData: SimpleStatCardProps[] = [
    {
      title: 'Total Sale',
      value: Number(sellingCompletedOrders?.orderStats[0]?.total_sales),
      type: 'N/A',
    },
    {
      title: 'Gross Value',
      value: Number(sellingCompletedOrders?.orderStats[0]?.gross_value_completed),
      type: '$',
    },
    {
      title: 'Net Value',
      value: Number(sellingCompletedOrders?.orderStats[0]?.net_value_completed),
      type: '$',
    },
    {
      title: 'Total Points Eared',
      value: Number(sellingCompletedOrders?.orderStats[0]?.points_earned),
      type: 'N/A',
    },
  ];

  const SellingActiveOrdersData = sellingActiveOrders.asks.map((order) => ({
    id: order?.product?.id,
    itemName: order?.product?.title ?? '-',
    askPrice: `$${order?.my_offer}`,
    highestOffer: `$${order?.highest_offer||0}`,
    lowestOffer:`$${order?.lowest_ask}`
  }));
  const SellingPendingOrdersData = sellingPendingOrders.orders.map((order) => ({
    id: order?.id,
    itemName: order?.product?.title ?? '-',
    salePrice: `$${order?.saleprice}`,
    trackingNo: order?.trackingid,
    saleDate: format(new Date(String(order?.created_on)), 'dd MMM, yyyy'),
    orderStatus: order?.status,
  }));
  const SellingCompletedOrdersData = sellingCompletedOrders.orders.map((order) => ({
    id: order?.id,
    itemName: order?.product?.title ?? '-',
    saleDate: format(new Date(String(order?.created_on)), 'dd MMM, yyyy'),
    orderNo: order?.id,
    status: order?.status === 'completed' ? true : false,
  }));

  const tableData: tableDataType = {
    active: {
      columns: getHeaderColumn('active'),
      data: SellingActiveOrdersData,
      RowUI: ActiveSimpleRow,
      tileData: activeTileData,
    },
    pending: {
      columns: getHeaderColumn('pending'),
      data: SellingPendingOrdersData,
      RowUI: PendingSimpleRow,
      tileData: pendingTileData,
    },
    completed: {
      columns: getHeaderColumn('completed'),
      data: SellingCompletedOrdersData,
      RowUI: CompletedSimpleRow,
      tileData: completedTileData,
    },
  };

  const selected = tableData[value as keyof tableDataType];
  return (
    <div className="mt-5">
      <TableHeaderBar
        data={selected['tileData']}
        searchValueSetState={setSearchValue}
        searchValuestate={searchValue}
        searchDateSetState={setSearchDate}
        searchDatestate={searchDate}
        segmentedSetState={setValue}
        segmentedstate={value}
      />
      <Only when={value === 'completed'}>
        <Group position="apart" className="my-5">
          <Center className="space-x-3">
            <Button
              bg="rgba(60, 130, 214, 1)"
              rightIcon={
                <span className="relative w-5 h-5 text-xs text-blue-500 bg-white rounded-full">
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {Number(sellingCompletedOrders?.orderStats[0].completed_sales)}
                  </span>
                </span>
              }
              styles={(theme) => ({
                root: {
                  [theme.fn.smallerThan(810)]: {
                    paddingLeft: 15,
                    paddingRight: 15,
                  },
                },
              })}
              className="text-[11px] font-medium md:text-sm"
              // component={NextLink}
              // href={'/selling-search'}
            >
              Completed
            </Button>
            <Button
              bg="rgba(241, 241, 241, 1)"
              rightIcon={
                <span className="relative w-5 h-5 text-xs text-white bg-black rounded-full">
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    {Number(sellingCompletedOrders?.orderStats[0].rejectd_sales)}
                  </span>
                </span>
              }
              styles={(theme) => ({
                root: {
                  [theme.fn.smallerThan(810)]: {
                    paddingLeft: 15,
                    paddingRight: 15,
                  },
                  '&:hover': {
                    color: 'white',
                  },
                },
              })}
              className="text-[11px] font-medium md:text-sm text-black"
              // component={NextLink}
              // href={'/selling-search'}
            >
              Rejected
            </Button>
          </Center>

          <Button
            component={NextLink}
            href={'/selling-search'}
            variant="outline"
            styles={(theme) => ({
              root: {
                [theme.fn.smallerThan(810)]: {
                  paddingLeft: 12,
                  paddingRight: 12,
                },
                borderRadius: 25,
              },
            })}
            leftIcon={<Plus size="12px" />}
          >
            New Item
          </Button>
        </Group>
      </Only>
      <DataTable
        data={value === 'active' ? selected.data.slice(0, limit) : selected.data}
        columns={selected.columns}
        search={searchValue}
        RowUI={selected.RowUI}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Only when={value === 'active' && limit !== selected.data.length && intialLimit < selected.data.length}>
        <Center className="mt-5 space-x-3">
          <Text size={16} className="font-[600]" color="black">
            View More
          </Text>
          <ActionIcon
            variant="outline"
            className="border-black rounded-xl w-9"
            onClick={() => setLimit((prev) => prev + 2)}
          >
            <ArrowDown size={20} color="black" />
          </ActionIcon>
        </Center>
      </Only>
    </div>
  );
}
