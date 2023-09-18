'use client';

import { GeneralsConstants } from '@/constants';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'sonner';
import { DataTableWrap } from '.';

interface DataTableProps<TData, TValue> {
  keyDatatable: string;
  columns: ColumnDef<TData, TValue>[];
  service: Function;
}

type DataTableHandle = {
  reload: () => void;
  setParams: (params: {}) => void;
};

type Data<TData> = {
  records: TData[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
};

interface InfoDataTable<TData> {
  data: Data<TData> | null;
  queryParams: {};
}

const DataTableServerSide = forwardRef<DataTableHandle, any>(
  <TData, TValue>(
    { keyDatatable, columns, service }: DataTableProps<TData, TValue>,
    ref: ForwardedRef<DataTableHandle>
  ) => {
    const [info, setInfo] = useState<InfoDataTable<TData>>({
      data: null,
      queryParams: {}
    });

    const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: GeneralsConstants.DATATABLE_PAGE_SIZE
    });

    const getDataFn = async () => {
      return await service(pageIndex + 1, info.queryParams);
    };

    const { isFetching, refetch } = useQuery({
      queryKey: [keyDatatable, info.queryParams],
      queryFn: getDataFn,
      onSuccess: (data) => {
        setInfo({
          ...info,
          data: data
        });
      },
      onError: () => {
        toast.error('Internal server error', {
          description: 'Please contact the administrator.'
        });
        setInfo({
          ...info,
          data: [] as any
        });
      }
    });

    useImperativeHandle(ref, () => ({
      reload: async () => {
        refetch();
      },
      setParams: (params) => {
        setPagination({
          pageIndex: 0,
          pageSize
        });

        setInfo({
          ...info,
          queryParams: {
            ...info.queryParams,
            ...params
          }
        });
      }
    }));

    useEffect(() => {
      refetch();
    }, [pageIndex, pageSize, info.queryParams]);

    const pagination = useMemo(
      () => ({
        pageIndex,
        pageSize
      }),
      [pageIndex, pageSize]
    );

    const table = useReactTable({
      data: info.data?.records ?? [],
      columns,
      pageCount: Math.ceil((info.data?.meta?.total || 0) / GeneralsConstants.DATATABLE_PAGE_SIZE),
      manualPagination: true,
      state: {
        pagination
      },
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel()
    });

    return <DataTableWrap table={table} loading={isFetching} totalRecords={info.data?.meta?.total ?? 0} />;
  }
);

export { DataTableServerSide, type DataTableHandle };
