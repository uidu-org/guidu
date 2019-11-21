// https://www.ag-grid.com/javascript-grid-filter-provided-simple/

const allFilters = [
  { name: '=', id: 'equals' }, // 	Text, Number, Date
  { name: 'Not Equals', id: 'notEqual' }, // 	Text, Number, Date
  { name: 'Contains', id: 'contains' }, // 	Text
  { name: 'Not Contains', id: 'notContains' }, // 	Text
  { name: 'Starts With', id: 'startsWith' }, // 	Text
  { name: 'Ends With', id: 'endsWith' }, // 	Text
  { name: '<', id: 'lessThan' }, // 	Number, Date
  { name: '<=', id: 'lessThanOrEqual' }, // 	Number
  { name: '>', id: 'greaterThan' }, // 	Number, Date
  { name: '>=', id: 'greaterThanOrEqual' }, // 	Number
  { name: 'In Range', id: 'inRange' }, // 	Number, Date
  { name: 'Empty', id: 'empty' }, // 	Text, Number, Date
];

export const filterKinds = (list: String[]) =>
  allFilters.filter(filter => list.indexOf(filter.id) >= 0);

export default allFilters;
