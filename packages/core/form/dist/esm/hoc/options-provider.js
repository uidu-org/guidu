import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import { Component, Children } from 'react';
import PropTypes from 'prop-types';

var OptionsProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(OptionsProvider, _Component);

  function OptionsProvider() {
    _classCallCheck(this, OptionsProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionsProvider).apply(this, arguments));
  }

  _createClass(OptionsProvider, [{
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
      return Children.only(this.props.children);
    }
  }]);

  return OptionsProvider;
}(Component);

var classNamesType = PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]);
var propTypes = {
  layout: PropTypes.string,
  validateOnSubmit: PropTypes.bool,
  validatePristine: PropTypes.bool,
  elementWrapperClassName: classNamesType,
  labelClassName: classNamesType,
  rowClassName: classNamesType
};
OptionsProvider.propTypes = _objectSpread({}, propTypes, {
  children: PropTypes.node.isRequired
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
export default OptionsProvider;