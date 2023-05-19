import { ColumnDef } from '@tanstack/react-table';

export function getHeaderColumn<T extends { id: string }>(tile: 'active' | 'pending' | 'completed') {
  const ActiveColumns: Array<ColumnDef<T, unknown>> = [
    {
      id: 'id',
      accessorKey: 'id',
      footer: () => null,
      header: 'ID',
    },
    {
      id: 'itemName',
      accessorKey: 'itemName',
      footer: () => null,
      header: 'Item Name',
    },
    {
      id: 'askPrice',
      accessorKey: 'askPrice',
      footer: () => null,
      header: 'Ask Price',
    },
    {
      id: 'highestOffer',
      accessorKey: 'highestOffer',
      footer: () => null,
      header: 'Highest Offer',
    },
    {
      id: 'action',
      footer: () => null,
    },
  ];
  const PendingColumns: Array<ColumnDef<T, unknown>> = [
    {
      id: 'id',
      accessorKey: 'id',
      footer: () => null,
      header: 'ID',
    },
    {
      id: 'itemName',
      accessorKey: 'itemName',
      footer: () => null,
      header: 'Item Name',
    },
    {
      id: 'salePrice',
      accessorKey: 'salePrice',
      footer: () => null,
      header: 'Sale Price',
    },
    {
      id: 'trackingNo',
      accessorKey: 'trackingNo',
      footer: () => null,
      header: 'Tracking No',
    },

    {
      id: 'saleDate',
      accessorKey: 'saleDate',
      footer: () => null,
      header: 'Sale Date',
    },
    {
      id: 'orderStatus',
      accessorKey: 'orderStatus',
      footer: () => null,
      header: 'Order Status',
    },
    {
      id: 'action',
      footer: () => null,
    },
  ];
  const CompletedColumns: Array<ColumnDef<T, unknown>> = [
    {
      id: 'id',
      accessorKey: 'id',
      footer: () => null,
      header: 'ID',
    },
    {
      id: 'itemName',
      accessorKey: 'itemName',
      footer: () => null,
      header: 'Item Name',
    },
    {
      id: 'saleDate',
      accessorKey: 'saleDate',
      footer: () => null,
      header: 'Sale Date',
    },
    {
      id: 'orderNo',
      accessorKey: 'orderNo',
      footer: () => null,
      header: 'Order No',
    },
    {
      id: 'status',
      accessorKey: 'status',
      footer: () => null,
      header: 'Status',
    },
    {
      id: 'action',
      footer: () => null,
    },
  ];
  const tileData = {
    active: ActiveColumns,
    pending: PendingColumns,
    completed: CompletedColumns,
  };
  return tileData[tile];
}
