import { parse } from 'query-string';

export const findById = (items, { match }, idKey = 'id') =>
  items.filter(i => i[idKey].toString() === match.params[idKey], 10)[0];

export const getUrlParams = (state, { location }) => parse(location.search);

export const getSortFromLocation = (
  state,
  props,
  { defaultSortBy: sortBy, defaultSortDirection: sortDirection },
) => {
  const urlParams = getUrlParams(state, props);
  return {
    sortBy: urlParams.sortBy || sortBy,
    sortDirection: urlParams.sortDirection || sortDirection,
  };
};

export const getFilterFromLocation = (
  state,
  props,
  { defaultFilter: filter },
) => {
  const urlParams = getUrlParams(state, props);
  return {
    filter: urlParams.filter || filter,
  };
};

export const getChartFiltersFromLocation = (
  state,
  props,
  {
    defaultDataKey: dataKey,
    defaultDataTimeFrame: dataTimeFrame,
    defaultDataTimeFrameGrouping: dataTimeFrameGrouping,
  },
) => {
  const urlParams = getUrlParams(state, props);
  return {
    dataKey: urlParams.dataKey || dataKey,
    dataTimeFrame: urlParams.dataTimeFrame || dataTimeFrame,
    dataTimeFrameGrouping:
      urlParams.dataTimeFrameGrouping || dataTimeFrameGrouping,
  };
};
