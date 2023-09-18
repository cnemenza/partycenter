import { format, parse } from 'date-fns';

const _DATEFORMAT = 'MM/dd/yyyy';
const _DATEFTIMEORMAT = 'MM/dd/yyyy HH:mm';

const dateToString = (date: Date) => {
  return format(date, _DATEFORMAT);
};

const dateToStringDetailed = (date: Date) => {
  return format(date, _DATEFTIMEORMAT);
};

const stringToDate = (dateStr: string) => {
  return parse(dateStr, _DATEFORMAT, new Date());
};

export { _DATEFORMAT, dateToString, dateToStringDetailed, stringToDate };
