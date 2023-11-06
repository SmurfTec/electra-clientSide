import { ColumnDef } from '@tanstack/react-table';

export function getHeaderColumn() {
  const Columns: Array<ColumnDef<any, unknown>> = [
    // {
    //   id: 'id',
    //   accessorKey: 'id',
    //   footer: () => null,
    //   header: 'ID',
    // },
    {
      id: 'itemName',
      accessorKey: 'itemName',
      footer: () => null,
      header: 'Item Name',
    },
    {
      id: 'condition',
      accessorKey: 'condition',
      footer: () => null,
      header: 'Condition',
    },
    {
      id: 'carrier',
      accessorKey: 'carrier',
      footer: () => null,
      header: 'Carrier',
    },
    {
      id: 'color',
      accessorKey: 'color',
      footer: () => null,
      header: 'Color',
    },
    {
      id: 'lowest-offer',
      accessorKey: 'lowest_offer',
      footer: () => null,
      header: 'Lowest Offer',
    },
    {
      id: 'date',
      accessorKey: 'date',
      footer: () => null,
      header: 'Date',
    },
    {
      id: 'sale-price',
      accessorKey: 'salePrice',
      footer: () => null,
      header: 'Sale Price',
    },
  ];

  return Columns;
}
