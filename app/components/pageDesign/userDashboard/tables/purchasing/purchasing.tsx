import { SimpleStatCardProps } from '@elektra/components';
import { DataTable, tableDataType } from '@elektra/customComponents';
import { useState } from 'react';
import { TableHeaderBar } from '../comman';
import { ActiveSimpleRow, CompletedSimpleRow, PendingSimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';

const pendingTileData: SimpleStatCardProps[] = [
  {
    title: 'Total Value',
    value: 3000,
    type: '$',
  },
  {
    title: 'Pending Orders',
    value: 5,
    type: 'N/A',
  },
];
const completedTileData: SimpleStatCardProps[] = [
  {
    title: 'Total Spent',
    value: 3000,
    type: '$',
  },
  {
    title: 'No of Purchase',
    value: 5,
    type: 'N/A',
  },
  {
    title: 'Points Eared',
    value: 2500,
    type: 'N/A',
  },
];

const activeTileData: SimpleStatCardProps[] = [
  {
    title: 'Active Offers',
    value: 10,
    type: 'N/A',
  },
  {
    title: 'Total Value',
    value: 2000,
    type: '$',
  },
];
const activetabledata = [
  {
    id: '#1',
    itemName: 'Iphone Unlocked',
    highestOffer: '$500',
    lowestOffer: '$100',
    myOffer: '$200',
    offerDate: '20 Aug,2022',
  },
  {
    id: '#2',
    itemName: 'Iphone Unlocked',
    highestOffer: '$400',
    lowestOffer: '$100',
    myOffer: '$200',
    offerDate: '20 Aug,2022',
  },
  {
    id: '#3',
    itemName: 'Iphone Unlocked',
    highestOffer: '$400',
    lowestOffer: '$100',
    myOffer: '$200',
    offerDate: '20 Aug,2022',
  },
  {
    id: '#4',
    itemName: 'Iphone Unlocked',
    highestOffer: '$400',
    lowestOffer: '$100',
    myOffer: '$200',
    offerDate: '20 Aug,2022',
  },
];
const pendingtabledata = [
  {
    id: '#11',
    itemName: 'Iphone Unlocked',
    purchasePrice: '$500',
    trackingNo: '123452',
    orderStatus: 'Pending',
    offerDate: '20 Aug,2022',
  },
  {
    id: '#22',
    itemName: 'Iphone Unlocked',
    purchasePrice: '$500',
    trackingNo: '123452',
    orderStatus: 'Pending',
    offerDate: '20 Aug,2022',
  },
  {
    id: '#33',
    itemName: 'Iphone Unlocked',
    purchasePrice: '$500',
    trackingNo: '123452',
    orderStatus: 'Declined',
    offerDate: '20 Aug,2022',
  },
  {
    id: '#44',
    itemName: 'Iphone Unlocked',
    purchasePrice: '$500',
    trackingNo: '123452',
    orderStatus: 'Pending',
    offerDate: '20 Aug,2022',
  },
];
const completedtabledata = [
  {
    id: '#111',
    itemName: 'Iphone Unlocked',
    purchaseDate: '20 Aug,2022',
    coveragePlan: 'None',
    orderNo: '12',
  },
  {
    id: '#222',
    itemName: 'Iphone Unlocked',
    purchaseDate: '20 Aug,2022',
    coveragePlan: 'None',
    orderNo: '42',
  },
  {
    id: '#333',
    itemName: 'Iphone Unlocked',
    purchaseDate: '20 Aug,2022',
    coveragePlan: 'None',
    orderNo: '132',
  },
  {
    id: '#444',
    itemName: 'Iphone Unlocked',
    purchaseDate: '20 Aug,2022',
    coveragePlan: 'None',
    orderNo: '122',
  },
];

export function Purchasing() {
  const [value, setValue] = useState('active');
  const [search, setSearch] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState({});

  const tableData: tableDataType = {
    active: {
      columns: getHeaderColumn('active'),
      data: activetabledata,
      RowUI: ActiveSimpleRow,
      tileData: activeTileData,
    },
    pending: {
      columns: getHeaderColumn('pending'),
      data: pendingtabledata,
      RowUI: PendingSimpleRow,
      tileData: pendingTileData,
    },
    completed: {
      columns: getHeaderColumn('completed'),
      data: completedtabledata,
      RowUI: CompletedSimpleRow,
      tileData: completedTileData,
    },
  };

  const selected = tableData[value as keyof tableDataType];

  return (
    <div className="mt-5">
      <TableHeaderBar
        data={selected['tileData']}
        searchSetState={setSearch}
        searchstate={search}
        segmentedSetState={setValue}
        segmentedstate={value}
      />
      <DataTable
        data={selected.data}
        columns={selected.columns}
        search={search}
        RowUI={selected.RowUI}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
}
