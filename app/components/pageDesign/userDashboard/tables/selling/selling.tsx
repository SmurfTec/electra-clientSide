import { SimpleStatCardProps } from '@elektra/components/card';
import { DataTable, Only, tableDataType } from '@elektra/customComponents';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { Plus } from 'tabler-icons-react';
import { TableHeaderBar } from '../comman';
import { ActiveSimpleRow, CompletedSimpleRow, PendingSimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';
import { NextLink } from '@mantine/next';

const pendingTileData: SimpleStatCardProps[] = [
  {
    title: 'Pending Sales',
    value: 5,
    type: 'N/A',
  },
  {
    title: 'Gross Value',
    value: 2000,
    type: '$',
  },
  {
    title: 'Net Value',
    value: 2100,
    type: '$',
  },
];
const completedTileData: SimpleStatCardProps[] = [
  {
    title: 'Total Sale',
    value: 20,
    type: 'N/A',
  },
  {
    title: 'Gross Value',
    value: 3,
    type: '$',
  },
  {
    title: 'Net Value',
    value: 17,
    type: '$',
  },
  {
    title: 'Total Points Eared',
    value: 17,
    type: 'N/A',
  },
];
const activeTileData: SimpleStatCardProps[] = [
  {
    title: 'No of Listings',
    value: 20,
    type: 'N/A',
  },
  {
    title: 'Gross Value',
    value: 2000,
    type: '$',
  },
  {
    title: 'Net Value',
    value: 1900,
    type: '$',
  },
];
const activetabledata = [
  {
    id: '#1',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#2',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#3',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#4',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
];
const pendingtabledata = [
  {
    id: '#11',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped Pending',
  },
  {
    id: '#22',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped',
  },
  {
    id: '#33',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped',
  },
  {
    id: '#44',
    itemName: 'Iphone Unlocked',
    salePrice: '$500',
    trackingNo: '123452',
    saleDate: '20 Aug,2022',
    orderStatus: 'Shipped',
  },
];
const completedtabledata = [
  {
    id: '#111',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo: '12',
    status: true,
  },
  {
    id: '#222',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo: '12',
    status: false,
  },
  {
    id: '#333',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo: '12',
    status: true,
  },
  {
    id: '444',
    itemName: 'Iphone Unlocked',
    saleDate: '20 Aug,2022',
    orderNo: '12',
    status: true,
  },
];

export function Selling() {
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
      <Only when={value === 'completed'}>
        <div className='text-right'>
        <Button
        component={NextLink}
        href={'/selling-search'}
          variant="outline"
          styles={{
            root: {
              borderRadius: 25,
            },
          }}
          leftIcon={<Plus size="12px" />}
        >
          New Item
        </Button>
        </div>
      </Only>
      {/* <DataTable
        data={selected.data}
        columns={selected.columns}
        search={search}
        RowUI={selected.RowUI}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      /> */}
    </div>
  );
}
