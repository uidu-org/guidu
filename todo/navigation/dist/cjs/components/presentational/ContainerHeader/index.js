"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("@atlaskit/theme");

var _Item = _interopRequireDefault(require("../Item"));

var _theme2 = require("../../../theme");

var gridSize = (0, _theme.gridSize)();

var modifyStyles = function modifyStyles(defaultStyles) {
  return (0, _objectSpread2.default)({}, defaultStyles, {
    itemBase: (0, _objectSpread2.default)({}, defaultStyles.itemBase, {
      height: gridSize * 6,
      paddingBottom: 0,
      paddingLeft: gridSize / 2 - 2,
      // Offset by 2px to account for border of avatar
      paddingRight: gridSize / 2,
      paddingTop: 0
    }),
    beforeWrapper: (0, _objectSpread2.default)({}, defaultStyles.beforeWrapper, {
      marginRight: gridSize - 2 // Offset by 2px to account for border of avatar

    }),
    afterWrapper: (0, _objectSpread2.default)({}, defaultStyles.afterWrapper, {
      marginLeft: gridSize
    }),
    textWrapper: (0, _objectSpread2.default)({}, defaultStyles.textWrapper, {
      fontWeight: 600
    })
  });
};

var ContainerHeader =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ContainerHeader, _PureComponent);

  function ContainerHeader() {
    (0, _classCallCheck2.default)(this, ContainerHeader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ContainerHeader).apply(this, arguments));
  }

  (0, _createClass2.default)(ContainerHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          styleReducer = _this$props.styles,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["styles"]); // We modify the Item styles ourselves, then allow the consumer to modify
      // these if they want to.

      var patchedStyles = function patchedStyles(defaultStyles, state) {
        return styleReducer(modifyStyles(defaultStyles), state);
      };

      return _react.default.createElement(_Item.default, (0, _extends2.default)({}, props, {
        styles: patchedStyles,
        spacing: "default"
      }));
    }
  }]);
  return ContainerHeader;
}(_react.PureComponent);

exports.default = ContainerHeader;
ContainerHeader.defaultProps = {
  styles: _theme2.styleReducerNoOp,
  isSelected: false,
  text: ''
};
module.exports = exports.default;