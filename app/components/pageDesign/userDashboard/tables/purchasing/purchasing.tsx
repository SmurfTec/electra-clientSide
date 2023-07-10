import { SimpleStatCardProps } from '@elektra/components';
import { DataTable, Only, tableDataType } from '@elektra/customComponents';
import { ActionIcon, Avatar, Center, Text } from '@mantine/core';
import { useState } from 'react';
import { ArrowDown, ArrowNarrowDown } from 'tabler-icons-react';
import { TableHeaderBar } from '../comman';
import { ActiveSimpleRow, CompletedSimpleRow, PendingSimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';
import { RootState, useSelector } from '@elektra/store';
import { format } from 'date-fns';

export function Purchasing() {
  const intialLimit = 4
  const [value, setValue] = useState('active');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchDate, setSearchDate] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState({});
  const [limit, setLimit] = useState(intialLimit);
  const {purchasingActiveOrders,purchasingCompletedOrders,purchasingPendingOrders} = useSelector((state: RootState) => state.entities.purchasingOrders.list);
  const activeTileData: SimpleStatCardProps[] = [
    {
      title: 'Active Offers',
      value: Number(purchasingActiveOrders?.bidStats?.active_bids),
      type: 'N/A',
    },
    {
      title: 'Total Value',
      value: Number(purchasingActiveOrders?.bidStats?.total_value),
      type: '$',
    },
  ];
  const pendingTileData: SimpleStatCardProps[] = [
    {
      title: 'Total Value',
      value: Number(purchasingPendingOrders?.orderStats[0].total_value),
      type: '$',
    },
    {
      title: 'Pending Orders',
      value: Number(purchasingPendingOrders?.orderStats[0].pending_orders),
      type: 'N/A',
    },
  ];
  const completedTileData: SimpleStatCardProps[] = [
    {
      title: 'Total Spent',
      value: Number(purchasingCompletedOrders?.orderStats[0].total_spent),
      type: '$',
    },
    {
      title: 'No of Purchase',
      value: Number(purchasingCompletedOrders?.orderStats[0].no_of_purchases),
      type: 'N/A',
    },
    {
      title: 'Points Eared',
      value: Number(purchasingCompletedOrders?.orderStats[0].points_earned_buyer),
      type: 'N/A',
    },
  ];
  const PurchasingActiveOrdersData = purchasingActiveOrders.bids.map((order)=>({
    id: order?.id,
    itemName: order?.product?.title??"-",
    highestOffer: `$${order?.highest_offer??0}`,
    lowestOffer: `$${order?.lowest_ask??0}`,
    myOffer: `$${order?.my_offer??0}`,
    offerDate: format(new Date(order?.offer_date), 'dd MMM, yyyy'),
  }))
  const PurchasingPendingOrdersData = purchasingPendingOrders.orders.map((order)=>({
    id: order?.id,
    itemName: order?.product?.title??'-',
    purchasePrice: order?.saleprice,
    trackingNo: order?.trackingid,
    orderStatus: order?.status,
    offerDate: format(new Date(String(order?.created_on)), 'dd MMM, yyyy'),
  }))
  const PurchasingCompletedOrdersData = purchasingCompletedOrders.orders.map((order)=>({
    id: order?.id,
    itemName: order?.product?.title??'-',
    purchaseDate: format(new Date(String(order?.created_on)), 'dd MMM, yyyy'),
    coveragePlan: order?.protection_plan?.name??'-',
    orderNo: order?.trackingid,
  }))
  const tableData: tableDataType = {
    active: {
      columns: getHeaderColumn('active'),
      data: PurchasingActiveOrdersData,
      RowUI: ActiveSimpleRow,
      tileData: activeTileData,
    },
    pending: {
      columns: getHeaderColumn('pending'),
      data: PurchasingPendingOrdersData,
      RowUI: PendingSimpleRow,
      tileData: pendingTileData,
    },
    completed: {
      columns: getHeaderColumn('completed'),
      data: PurchasingCompletedOrdersData,
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
      <DataTable
        data={value === 'active' ? selected.data.slice(0, limit) : selected.data}
        columns={selected.columns}
        search={searchValue || searchDate}
        RowUI={selected.RowUI}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Only when={value === 'active' && limit!==selected.data.length && intialLimit <selected.data.length}>
      <Center className="mt-5 space-x-3">
        <Text size={16} className="font-[600]" color="black" >
          View More
        </Text>
        <ActionIcon variant="outline" className="rounded-xl w-9 border-black" onClick={() => setLimit((prev) => prev + 2)}>
          <ArrowDown size={20} color="black" />
        </ActionIcon>
      </Center>
      </Only>
    </div>
  );
}
