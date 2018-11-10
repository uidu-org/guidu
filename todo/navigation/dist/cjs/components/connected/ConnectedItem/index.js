"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.iconMap = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _arrowRight = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-right"));

var _backlog = _interopRequireDefault(require("@atlaskit/icon/glyph/backlog"));

var _board = _interopRequireDefault(require("@atlaskit/icon/glyph/board"));

var _dashboard = _interopRequireDefault(require("@atlaskit/icon/glyph/dashboard"));

var _graphLine = _interopRequireDefault(require("@atlaskit/icon/glyph/graph-line"));

var _folder = _interopRequireDefault(require("@atlaskit/icon/glyph/folder"));

var _issues = _interopRequireDefault(require("@atlaskit/icon/glyph/issues"));

var _ship = _interopRequireDefault(require("@atlaskit/icon/glyph/ship"));

var _GoToItem = _interopRequireDefault(require("../GoToItem"));

var _Item = _interopRequireDefault(require("../../presentational/Item"));

var iconMap = {
  ArrowRightIcon: _arrowRight.default,
  BacklogIcon: _backlog.default,
  BoardIcon: _board.default,
  DashboardIcon: _dashboard.default,
  GraphLineIcon: _graphLine.default,
  FolderIcon: _folder.default,
  IssuesIcon: _issues.default,
  ShipIcon: _ship.default
};
exports.iconMap = iconMap;

var ConnectedItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConnectedItem, _Component);

  function ConnectedItem() {
    (0, _classCallCheck2.default)(this, ConnectedItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConnectedItem).apply(this, arguments));
  }

  (0, _createClass2.default)(ConnectedItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          beforeProp = _this$props.before,
          icon = _this$props.icon,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["before", "icon"]);
      var before = beforeProp;

      if (!before && typeof icon === 'string' && iconMap[icon]) {
        before = iconMap[icon];
      }

      var props = (0, _objectSpread2.default)({}, rest, {
        before: before
      });
      return props.goTo ? _react.default.createElement(_GoToItem.default, props) : _react.default.createElement(_Item.default, props);
    }
  }]);
  return ConnectedItem;
}(_react.Component);

exports.default = ConnectedItem;