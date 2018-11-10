"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartFiltersFromLocation = exports.getFilterFromLocation = exports.getSortFromLocation = exports.getUrlParams = exports.findById = void 0;

var _queryString = require("query-string");

var findById = function findById(items, _ref) {
  var match = _ref.match;
  var idKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  return items.filter(function (i) {
    return i[idKey].toString() === match.params[idKey];
  }, 10)[0];
};

exports.findById = findById;

var getUrlParams = function getUrlParams(state, _ref2) {
  var location = _ref2.location;
  return (0, _queryString.parse)(location.search);
};

exports.getUrlParams = getUrlParams;

var getSortFromLocation = function getSortFromLocation(state, props, _ref3) {
  var sortBy = _ref3.defaultSortBy,
      sortDirection = _ref3.defaultSortDirection;
  var urlParams = getUrlParams(state, props);
  return {
    sortBy: urlParams.sortBy || sortBy,
    sortDirection: urlParams.sortDirection || sortDirection
  };
};

exports.getSortFromLocation = getSortFromLocation;

var getFilterFromLocation = function getFilterFromLocation(state, props, _ref4) {
  var filter = _ref4.defaultFilter;
  var urlParams = getUrlParams(state, props);
  return {
    filter: urlParams.filter || filter
  };
};

exports.getFilterFromLocation = getFilterFromLocation;

var getChartFiltersFromLocation = function getChartFiltersFromLocation(state, props, _ref5) {
  var dataKey = _ref5.defaultDataKey,
      dataTimeFrame = _ref5.defaultDataTimeFrame,
      dataTimeFrameGrouping = _ref5.defaultDataTimeFrameGrouping;
  var urlParams = getUrlParams(state, props);
  return {
    dataKey: urlParams.dataKey || dataKey,
    dataTimeFrame: urlParams.dataTimeFrame || dataTimeFrame,
    dataTimeFrameGrouping: urlParams.dataTimeFrameGrouping || dataTimeFrameGrouping
  };
};

exports.getChartFiltersFromLocation = getChartFiltersFromLocation;