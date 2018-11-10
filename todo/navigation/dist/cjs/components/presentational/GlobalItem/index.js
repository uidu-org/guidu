"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GlobalItemBase = void 0;

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

var GlobalItemBase =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(GlobalItemBase, _PureComponent);

  function GlobalItemBase() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GlobalItemBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GlobalItemBase)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderItem = function (state) {
      return _react.default.createElement(_primitives.default, (0, _extends2.default)({}, state, _this.props));
    };

    return _this;
  }

  (0, _createClass2.default)(GlobalItemBase, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          mode = _this$props.theme.mode;

      var _styleReducerNoOp = (0, _theme.styleReducerNoOp)(mode.globalItem({
        size: size
      })),
          itemWrapperStyles = _styleReducerNoOp.itemWrapper;

      return _react.default.createElement("div", {
        css: itemWrapperStyles
      }, _react.default.createElement(_InteractionStateManager.default, null, this.renderItem));
    }
  }]);
  return GlobalItemBase;
}(_react.PureComponent);

exports.GlobalItemBase = GlobalItemBase;
GlobalItemBase.defaultProps = {
  label: '',
  size: 'large',
  styles: _theme.styleReducerNoOp
};

var _default = (0, _analytics.navigationItemClicked)((0, _theme.withGlobalTheme)(GlobalItemBase), 'globalItem', true);

exports.default = _default;