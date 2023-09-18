import { Table as TanstackTable, flexRender } from '@tanstack/react-table';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { DataTablePagination } from '.';
import { Loader } from '../loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';

interface DataTableProps<TData> {
  loading: boolean;
  totalRecords: number;
  table: TanstackTable<TData>;
}

function DataTableWrap<TData>({ table, loading, totalRecords }: DataTableProps<TData>) {
  return (
    <div className={`space-y-4 ${loading ? 'relative min-h-[18rem]' : ''}`}>
      {loading ? <Loader text='This may take a few seconds.' /> : null}
      <Table className={`${loading ? 'blur-sm' : ''}`}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalRecords == 0 && !loading && (
        <div className='flex flex-col items-center mt-4 gap-2'>
          <HiOutlineEmojiSad className='w-10 h-10' />
          No records found
        </div>
      )}

      <DataTablePagination className={`${loading ? 'blur-sm' : ''}`} table={table} totalRecords={totalRecords} />
    </div>
  );
}

export { DataTableWrap };
