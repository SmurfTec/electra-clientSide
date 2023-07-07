import { clsx, createStyles, Table } from '@mantine/core';
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  OnChangeFn,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { JSXElementConstructor, useMemo } from 'react';

type tableDataType = {
  [x: string]: {
    columns: Array<ColumnDef<any, unknown>>;
    data: Array<any>;
    RowUI: (props: CellContext<any, unknown>) => JSX.Element;
    [x: string]: any;
  };
};

type DataTableProps<T extends { id: string | number }> = {
  data: T[];
  columns?: ColumnDef<T>[];
  search?: string;
  RowUI?: JSXElementConstructor<CellContext<T, unknown>>;
  className?: string;
  selectedRows?: RowSelectionState;
  setSelectedRows?: OnChangeFn<RowSelectionState>;
};

function getHeaderColumn<T extends { id: string | number }>(data: Array<T>) {
  return Object.keys(data[0]).map(
    (key) =>
      ({
        accessorKey: key,
        footer: () => null,
        header: key.toUpperCase(),
      } as ColumnDef<T, unknown>)
  );
}

export function DataTable<T extends { id: string |number}>({
  data,
  columns,
  RowUI,
  search,
  className,
  selectedRows,
  setSelectedRows,
}: DataTableProps<T>) {
  const defaultRowUI = {
    cell: (props: CellContext<T, unknown>) => (RowUI ? <RowUI {...props} /> : props.cell.getValue()),
  };
  const tableData = useMemo(() => columns, [columns]);
  const table = useReactTable<T>({
    data,
    columns: columns ? tableData! : getHeaderColumn(data),
    state: {
      globalFilter: search,
      rowSelection: selectedRows,
    },
    onRowSelectionChange: setSelectedRows,
    defaultColumn: defaultRowUI,
    manualPagination:true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { classes } = useStyles();
  return (
    <div className="overflow-x-auto w-full">
      <Table className={clsx(classes.table, className)} striped>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row,index) => {
             return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          )})}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;

export type { tableDataType };

// Styles used by the DataTable

const useStyles = createStyles((theme) => ({
  table: {
    thead: {
      tr: {
        borderBottom: '1px solid grey',
        th: {
          color: '#B4B4B4',
          fontWeight: 400,
          fontSize: '1rem',
          [theme.fn.smallerThan(1150)]: {
            fontSize: '0.8rem',
          },
        },
      },
    },
    tbody: {
      tr: {
        td: {
          border: 'unset',
        },
      },
    },
  },
}));
