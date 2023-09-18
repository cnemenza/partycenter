'use client';

import { cn } from '@/utils';
import { Table } from '@tanstack/react-table';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Button } from '../button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRecords: number;
  className: string;
}

export function DataTablePagination<TData>({ table, totalRecords, className }: DataTablePaginationProps<TData>) {
  return totalRecords == 0 ? null : (
    <div className={cn('gap-3 flex items-center justify-between flex-col-reverse lg:flex-row', className)}>
      <div className='flex-1'>
        Showing {table.getState().pagination.pageSize * table.getState().pagination.pageIndex + 1} to{' '}
        {totalRecords < table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1)
          ? totalRecords
          : table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1)}{' '}
        of {totalRecords} entries
      </div>
      <div className='flex items-center space-x-0 lg:space-x-8'>
        <div className='flex items-center space-x-1'>
          <Button
            type='button'
            variant='outline'
            className='h-9 w-9 p-0 rounded-full'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <HiChevronLeft className='h-5 w-5' />
          </Button>

          {isNaN(table.getPageCount())
            ? null
            : [...Array(table.getPageCount())].map((x, i) => (
                <Button
                  key={i}
                  variant={`${table.getState().pagination.pageIndex == i ? 'primary' : 'outline'}`}
                  type='button'
                  onClick={() => table.setPageIndex(i)}
                  className={`h-9 w-9 p-0 rounded-full`}
                >
                  {i + 1}
                </Button>
              ))}

          <Button
            type='button'
            variant='outline'
            className='h-9 w-9 p-0 rounded-full'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <HiChevronRight className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
}
