import { format, parse } from 'date-fns';

const stringToDate = (dateStr: string) => {
  const date = parse(dateStr, 'MM/dd/yyyy', new Date());
  return date;
};

const dateToStringQuery = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export { dateToStringQuery, stringToDate };
