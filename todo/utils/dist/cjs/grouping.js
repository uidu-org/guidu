"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByDay = void 0;

var _d3Collection = require("d3-collection");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupByDay = function groupByDay(list, rollup) {
  return (0, _d3Collection.nest)().key(function (d) {
    return (0, _moment.default)(d.createdAt).startOf('day').format('L');
  }).rollup(rollup).entries(list);
};

exports.groupByDay = groupByDay;