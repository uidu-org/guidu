import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import StyledButton from 'react-bootstrap/Button';

var Button =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      console.log(this.props);

      var _this$props = this.props,
          component = _this$props.component,
          withIcon = _this$props.withIcon,
          otherProps = _objectWithoutProperties(_this$props, ["component", "withIcon"]);

      return React.createElement(StyledButton, _extends({
        className: withIcon ? 'd-flex align-items-center' : ''
      }, otherProps));
    }
  }]);

  return Button;
}(PureComponent);

export { Button as default };