import { ColumnDef } from '@tanstack/react-table';

export function getHeaderColumn() {
  const Columns: Array<ColumnDef<any, unknown>> = [
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
      id: 'higestOffer',
      accessorKey: 'highestOffer',
      footer: () => null,
      header: 'Lowest Offer',
    },
    {
      id: 'action',
      footer: () => null,
    },
  ];
 
return Columns
}
