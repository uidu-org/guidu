"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ItemBase = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _analytics = require("../../../common/analytics");

var _InteractionStateManager = _interopRequireDefault(require("../InteractionStateManager"));

var _theme = require("../../../theme");

var _primitives = _interopRequireDefault(require("./primitives"));

var Item =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Item, _PureComponent);

  function Item() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Item)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderItem = function (state) {
      return _react.default.createElement(_primitives.default, (0, _extends2.default)({}, state, _this.props));
    };

    return _this;
  }

  (0, _createClass2.default)(Item, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_InteractionStateManager.default, this.props, this.renderItem);
    }
  }]);
  return Item;
}(_react.PureComponent);

exports.ItemBase = Item;
Item.defaultProps = {
  styles: _theme.styleReducerNoOp,
  isSelected: false,
  spacing: 'default',
  text: ''
};

var _default = (0, _analytics.navigationItemClicked)(Item, 'item');

exports.default = _default;