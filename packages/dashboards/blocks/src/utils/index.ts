import { group, max, mean, sum } from 'd3-array';
import numeral from 'numeral';

// http://tristen.ca/hcl-picker/#/hlc/14/0.53/433339/E8D489
export const colors = [
  '#E8D489',
  '#CCCB84',
  '#B2C182',
  '#9BB682',
  '#87AA81',
  '#769D81',
  '#6A907F',
  '#62827A',
  '#5C7474',
  '#555960',
  '#58666B',
  '#504B54',
  '#4B3F46',
  '#433339',
];

export const manipulator = (record, [operation, key]) => {
  switch (operation) {
    case 'sum':
      return sum(record, c => resolve(key, c));
    case 'count':
      return group(record.filter(l => !l.fake), c => resolve(key, c)).size;
    case 'max':
      return max(record, c => resolve(key, c));
    case 'mean':
      return mean(record, c => resolve(key, c) || 0);
    default:
      return record.length;
  }
};

export const resolve = (path, obj) =>
  path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj || self);

export const format = (value, formatter) => {
  switch (formatter) {
    case 'currency':
      return numeral(value / 100).format('$ 0,0.00');
    case 'integer':
      return numeral(value).format();
    case 'percent':
      return numeral(value).format('0.0%');
    case 'bytes':
      return numeral(value).format('0.00b');
    default:
      return value;
  }
};
