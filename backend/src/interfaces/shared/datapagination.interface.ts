interface IMetaPagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface IDataPagination {
  records: any[];
  meta: IMetaPagination;
}
