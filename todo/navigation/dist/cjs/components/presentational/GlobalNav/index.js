"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _GlobalItem = _interopRequireDefault(require("../GlobalItem"));

var _theme = require("../../../theme");

var _GlobalNavigation = _interopRequireDefault(require("./GlobalNavigation"));

/**
 * NOTE: This GlobalNavigation is the layout primitive, which will be wrapped by
 * the more opinionated @atlaskit/global-navigation component.
 */
var GlobalNavigationWithTheme = (0, _theme.withGlobalTheme)(_GlobalNavigation.default);

var ConnectedGlobalNavigation =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConnectedGlobalNavigation, _Component);

  function ConnectedGlobalNavigation() {
    (0, _classCallCheck2.default)(this, ConnectedGlobalNavigation);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConnectedGlobalNavigation).apply(this, arguments));
  }

  (0, _createClass2.default)(ConnectedGlobalNavigation, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(GlobalNavigationWithTheme, this.props);
    }
  }]);
  return ConnectedGlobalNavigation;
}(_react.Component);

exports.default = ConnectedGlobalNavigation;
ConnectedGlobalNavigation.defaultProps = {
  itemComponent: _GlobalItem.default
};
module.exports = exports.default;