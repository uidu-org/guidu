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

var _analyticsNamespacedContext = require("@atlaskit/analytics-namespaced-context");

var _ = require("../../../");

var Group =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Group, _Component);

  function Group() {
    (0, _classCallCheck2.default)(this, Group);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Group).apply(this, arguments));
  }

  (0, _createClass2.default)(Group, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          hasSeparator = _this$props.hasSeparator,
          heading = _this$props.heading,
          id = _this$props.id;
      return _react.default.Children.count(children) ? _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: {
            viewGroup: id
          },
          componentName: 'Group'
        }
      }, _react.default.createElement(_react.Fragment, null, heading && _react.default.createElement(_.GroupHeading, null, heading), children, hasSeparator && _react.default.createElement(_.Separator, null))) : null;
    }
  }]);
  return Group;
}(_react.Component);

exports.default = Group;
Group.defaultProps = {
  hasSeparator: false
};
module.exports = exports.default;