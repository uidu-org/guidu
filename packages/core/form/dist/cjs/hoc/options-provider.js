"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var OptionsProvider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(OptionsProvider, _Component);

  function OptionsProvider() {
    (0, _classCallCheck2.default)(this, OptionsProvider);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OptionsProvider).apply(this, arguments));
  }

  (0, _createClass2.default)(OptionsProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        layout: this.props.layout,
        validateOnSubmit: this.props.validateOnSubmit,
        validatePristine: this.props.validatePristine,
        rowClassName: this.props.rowClassName,
        labelClassName: this.props.labelClassName,
        elementWrapperClassName: this.props.elementWrapperClassName
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);
  return OptionsProvider;
}(_react.Component);

var classNamesType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array, _propTypes.default.object]);

var propTypes = {
  layout: _propTypes.default.string,
  validateOnSubmit: _propTypes.default.bool,
  validatePristine: _propTypes.default.bool,
  elementWrapperClassName: classNamesType,
  labelClassName: classNamesType,
  rowClassName: classNamesType
};
OptionsProvider.propTypes = (0, _objectSpread2.default)({}, propTypes, {
  children: _propTypes.default.node.isRequired
});
OptionsProvider.defaultProps = {
  layout: 'vertical',
  validateOnSubmit: false,
  validatePristine: false,
  rowClassName: '',
  labelClassName: '',
  elementWrapperClassName: ''
};
OptionsProvider.childContextTypes = propTypes;
var _default = OptionsProvider;
exports.default = _default;
module.exports = exports.default;