'use client';

import { GeneralsConstants } from '@/constants';
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { DataTableWrap } from '.';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

function DataTableClientSide<TData, TValue>({ columns, data, loading }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    initialState: {
      pagination: { pageSize: GeneralsConstants.DATATABLE_PAGE_SIZE }
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return <DataTableWrap table={table} loading={loading} totalRecords={table.getFilteredRowModel().rows.length} />;
}

export { DataTableClientSide };
