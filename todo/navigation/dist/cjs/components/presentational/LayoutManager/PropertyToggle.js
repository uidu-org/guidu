"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var PropertyToggle =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(PropertyToggle, _PureComponent);

  function PropertyToggle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, PropertyToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PropertyToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.originalAttributes = {};
    _this.originalStyles = {};
    _this.attributeKeys = void 0;
    _this.styleKeys = void 0;
    return _this;
  }

  (0, _createClass2.default)(PropertyToggle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          styles = _this$props.styles,
          target = _this$props.target;
      this.attributeKeys = Object.keys(attributes);
      this.styleKeys = Object.keys(styles); // styles

      if (this.styleKeys.length) {
        this.styleKeys.forEach(function (k) {
          _this2.originalStyles[k] = target.style.getPropertyValue(k);
          target.style.setProperty(k, styles[k]);
        });
      } // attributes


      if (this.attributeKeys.length) {
        this.attributeKeys.forEach(function (k) {
          _this2.originalAttributes[k] = target.getAttribute(k) || '';
          target.setAttribute(k, attributes[k]);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      var target = this.props.target; // styles

      if (this.styleKeys.length) {
        this.styleKeys.forEach(function (k) {
          target.style.setProperty(k, _this3.originalStyles[k]);
        });
      } // attributes


      if (this.attributeKeys.length) {
        this.attributeKeys.forEach(function (k) {
          if (_this3.originalAttributes[k]) {
            target.setAttribute(k, _this3.originalAttributes[k]);
          } else {
            target.removeAttribute(k);
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return PropertyToggle;
}(_react.PureComponent);

var LifeCycleProvider = function LifeCycleProvider(_ref) {
  var isActive = _ref.isActive,
      props = (0, _objectWithoutProperties2.default)(_ref, ["isActive"]);
  return isActive ? _react.default.createElement(PropertyToggle, props) : null;
}; // appease flow


var defaultTarget = typeof document !== 'undefined' ? document.body : null;
LifeCycleProvider.defaultProps = {
  attributes: {},
  target: defaultTarget,
  styles: {}
};
var _default = LifeCycleProvider;
exports.default = _default;
module.exports = exports.default;