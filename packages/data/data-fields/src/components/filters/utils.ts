// https://www.ag-grid.com/javascript-grid-filter-provided-simple/

import { useIntl } from 'react-intl';

export type FilterType = 'text' | 'number' | 'date' | 'singleSelect';

export type FilterMap = { kinds: FilterType[]; name: string; id: string };

function useFilters(): FilterMap[] {
  const intl = useIntl();
  return [
    { kinds: ['text', 'number', 'date'], name: '=', id: 'equals' },
    {
      kinds: ['text', 'number', 'date'],
      name: intl.formatMessage({
        defaultMessage: 'Not Equals',
        id: 'filters.notEqual',
      }),
      id: 'notEqual',
    },
    { kinds: ['text'], name: 'Contains', id: 'contains' },
    { kinds: ['text'], name: 'Not Contains', id: 'notContains' },
    { kinds: ['text'], name: 'Starts With', id: 'startsWith' },
    { kinds: ['text'], name: 'Ends With', id: 'endsWith' },
    { kinds: ['number', 'date'], name: '<', id: 'lessThan' },
    { kinds: ['number'], name: '<=', id: 'lessThanOrEqual' },
    { kinds: ['number', 'date'], name: '>', id: 'greaterThan' },
    { kinds: ['number'], name: '>=', id: 'greaterThanOrEqual' },
    { kinds: ['number', 'date'], name: 'In Range', id: 'inRange' },
    { kinds: ['text', 'number', 'date'], name: 'Empty', id: 'empty' },
    { kinds: ['singleSelect'], name: 'Is', id: 'equals' },
    { kinds: ['singleSelect'], name: 'Is not', id: 'notEqual' },
  ];
}

export function usePickFilters(list: String[]): FilterMap[] {
  const filters = useFilters();

  return filters.filter((filter) => list.indexOf(filter.id) >= 0);
}

export function useFiltersByType(
  type: FilterType,
): Array<{ id: string; name: string }> {
  const filters = useFilters();

  return filters
    .filter((filter) => filter.kinds.includes(type))
    .map(({ id, name }) => ({ id, name }));
}

export default useFiltersByType;
