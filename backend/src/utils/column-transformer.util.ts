import { format, parse } from 'date-fns';
import { DatabaseType } from 'typeorm';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export class ColumnDateTransformer {
  from(value: DatabaseType) {
    const date = parse(value, 'yyyy-MM-dd', new Date());
    return format(date, 'MM/dd/yyyy');
  }
  to(value) {
    return value;
  }
}
