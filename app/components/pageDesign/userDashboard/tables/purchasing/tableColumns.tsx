import { ColumnDef } from '@tanstack/react-table';

export function getHeaderColumn<T extends { id: string | number }>(tile:"active"|"pending"|"completed") {

    
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
      id: 'highestOffer',
      accessorKey: 'highestOffer',
      footer: () => null,
      header: 'Highest Offer',
    },
    {
      id: 'lowestOffer',
      accessorKey: 'lowestOffer',
      footer: () => null,
      header: 'Lowest Offer',
    },
    {
      id: 'myOffer',
      accessorKey: 'myOffer',
      footer: () => null,
      header: 'My Offer',
    },
    {
      id: 'offerDate',
      accessorKey: 'offerDate',
      footer: () => null,
      header: 'Offer Date',
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
      id: 'purchasePrice',
      accessorKey: 'purchasePrice',
      footer: () => null,
      header: 'Purchase Price',
    },
    {
      id: 'trackingNo',
      accessorKey: 'trackingNo',
      footer: () => null,
      header: 'Tracking No',
    },
    {
      id: 'orderStatus',
      accessorKey: 'orderStatus',
      footer: () => null,
      header: 'Order Status',
    },
    {
      id: 'offerDate',
      accessorKey: 'offerDate',
      footer: () => null,
      header: 'Order Date',
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
      id: 'purchaseDate',
      accessorKey: 'purchaseDate',
      footer: () => null,
      header: 'Purchase Date',
    },
    {
      id: 'coveragePlan',
      accessorKey: 'coveragePlan',
      footer: () => null,
      header: 'Coverage Plan',
    },
    {
      id: 'orderNo',
      accessorKey: 'orderNo',
      footer: () => null,
      header: 'Order No',
    },
    {
      id: 'action',
      footer: () => null,
    },
  ];
  const tileData ={
    active:ActiveColumns,
    pending:PendingColumns,
    completed:CompletedColumns
}
  return tileData[tile];
}
