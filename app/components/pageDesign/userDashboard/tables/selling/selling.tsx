import { SimpleStatCardProps } from '@elektra/components/card';
import { DataTable, Only, tableDataType } from '@elektra/customComponents';
import { ActionIcon, Avatar, Button, Center, Group, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import { ArrowDown, Plus } from 'tabler-icons-react';
import { TableHeaderBar } from '../comman';
import { ActiveSimpleRow, CompletedSimpleRow, PendingSimpleRow } from './rowUI';
import { getHeaderColumn } from './tableColumns';

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
  {
    id: '#5',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#6',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#7',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#8',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#9',
    itemName: 'Iphone Unlocked',
    askPrice: '$100',
    highestOffer: '$500',
  },
  {
    id: '#10',
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
  const [limit, setLimit] = useState(4);

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
        <Group position="apart" className='my-5'>
          <Center className="space-x-3">
            <Button
              bg="rgba(60, 130, 214, 1)"
              rightIcon={
                <Avatar size={16} radius={16} bg="white" color="blue">
                  17
                </Avatar>
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
              component={NextLink}
              href={'/selling-search'}
            >
              Completed
            </Button>
            <Button
              bg="rgba(241, 241, 241, 1)"
              rightIcon={
                <Avatar size={16} radius={16} variant="filled" color="black">
                  17
                </Avatar>
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
              component={NextLink}
              href={'/selling-search'}
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
        search={search}
        RowUI={selected.RowUI}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Only when={value === 'active'}>
        <Center className="mt-5 space-x-3">
          <Text size={16} className="font-[600]" color="black">
            View More
          </Text>
          <ActionIcon
            variant="outline"
            className="rounded-xl w-9 border-black"
            onClick={() => setLimit((prev) => prev + 2)}
          >
            <ArrowDown size={20} color="black" />
          </ActionIcon>
        </Center>
      </Only>
    </div>
  );
}
