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

var _SkeletonItem = _interopRequireDefault(require("../SkeletonItem"));

var _theme2 = require("../../../theme");

var gridSize = (0, _theme.gridSize)();

var modifyStyles = function modifyStyles(defaultStyles) {
  return (0, _objectSpread2.default)({}, defaultStyles, {
    wrapper: (0, _objectSpread2.default)({}, defaultStyles.wrapper, {
      height: "".concat(gridSize * 6, "px"),
      paddingLeft: gridSize / 2,
      paddingRight: gridSize / 2
    }),
    before: (0, _objectSpread2.default)({}, defaultStyles.before, {
      borderRadius: 3,
      height: gridSize * 5,
      marginRight: gridSize,
      width: gridSize * 5
    })
  });
};

var SkeletonContainerHeader =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(SkeletonContainerHeader, _PureComponent);

  function SkeletonContainerHeader() {
    (0, _classCallCheck2.default)(this, SkeletonContainerHeader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SkeletonContainerHeader).apply(this, arguments));
  }

  (0, _createClass2.default)(SkeletonContainerHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          styleReducer = _this$props.styles,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["styles"]); // We modify the SkeletonItem styles ourselves, then allow the consumer to
      // modify these if they want to.

      var patchedStyles = function patchedStyles(defaultStyles) {
        return styleReducer(modifyStyles(defaultStyles));
      };

      return _react.default.createElement(_SkeletonItem.default, (0, _extends2.default)({}, props, {
        styles: patchedStyles,
        spacing: "default"
      }));
    }
  }]);
  return SkeletonContainerHeader;
}(_react.PureComponent);

exports.default = SkeletonContainerHeader;
SkeletonContainerHeader.defaultProps = {
  hasBefore: false,
  styles: _theme2.styleReducerNoOp
};
module.exports = exports.default;