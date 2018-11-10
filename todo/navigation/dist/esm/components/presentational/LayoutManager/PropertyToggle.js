import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';

var PropertyToggle =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PropertyToggle, _PureComponent);

  function PropertyToggle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PropertyToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PropertyToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.originalAttributes = {};
    _this.originalStyles = {};
    _this.attributeKeys = void 0;
    _this.styleKeys = void 0;
    return _this;
  }

  _createClass(PropertyToggle, [{
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
}(PureComponent);

var LifeCycleProvider = function LifeCycleProvider(_ref) {
  var isActive = _ref.isActive,
      props = _objectWithoutProperties(_ref, ["isActive"]);

  return isActive ? React.createElement(PropertyToggle, props) : null;
}; // appease flow


var defaultTarget = typeof document !== 'undefined' ? document.body : null;
LifeCycleProvider.defaultProps = {
  attributes: {},
  target: defaultTarget,
  styles: {}
};
export default LifeCycleProvider;