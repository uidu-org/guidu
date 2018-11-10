import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { CustomInput } from 'reactstrap';
import styled from 'styled-components';
import { ComponentCommon, ErrorMessages, Help, Row } from '@uidu/field-base';
var CustomInputComponent = styled(CustomInput).withConfig({
  displayName: "Checkbox__CustomInputComponent",
  componentId: "sc-1xfzm12-0"
})(["\n  :hover {\n    .custom-control-label {\n      ::before {\n        background-color: var(--gray);\n      }\n    }\n  }\n  .custom-control-label {\n    ::before {\n      background-color: transparent;\n      border: 1px solid var(--gray);\n    }\n  }\n"]);

var Checkbox =
/*#__PURE__*/
function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.changeValue = function (e) {
      var _this$props = _this.props,
          onSetValue = _this$props.onSetValue,
          onChange = _this$props.onChange,
          name = _this$props.name;
      var value = e.currentTarget.checked;
      onSetValue(value);
      onChange(name, value);
    };

    _this.renderElement = function () {
      var inputProps = Object.assign({}, _this.props);
      var _this$props2 = _this.props,
          id = _this$props2.id,
          disabled = _this$props2.disabled,
          label = _this$props2.label;
      Object.keys(ComponentCommon.propTypes).forEach(function (key) {
        delete inputProps[key];
      });
      delete inputProps.addonAfter;
      delete inputProps.addonBefore;
      delete inputProps.buttonAfter;
      delete inputProps.buttonBefore;
      delete inputProps.debounce;
      delete inputProps.updateOn;
      delete inputProps.value;
      delete inputProps.onBlur;
      delete inputProps.isPristine;
      delete inputProps.showErrors;
      return React.createElement(CustomInputComponent, _extends({}, inputProps, {
        type: "checkbox",
        disabled: disabled,
        id: id,
        label: label,
        onChange: _this.changeValue
      }));
    };

    return _this;
  }

  _createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          help = _this$props3.help,
          showErrors = _this$props3.showErrors,
          errorMessages = _this$props3.errorMessages,
          layout = _this$props3.layout,
          id = _this$props3.id;
      var element = this.renderElement();

      if (layout === 'elementOnly') {
        return element;
      }

      return React.createElement(Row, _extends({}, this.props, {
        htmlFor: id,
        fakeLabel: true
      }), element, help && React.createElement(Help, {
        help: help
      }), showErrors && React.createElement(ErrorMessages, {
        messages: errorMessages
      }));
    }
  }]);

  return Checkbox;
}(Component);

Checkbox.defaultProps = {
  isDisabled: false,
  isInvalid: false,
  defaultChecked: false,
  isIndeterminate: false
};
export { Checkbox as default };
Checkbox.defaultProps = _objectSpread({}, ComponentCommon.defaultProps, {
  type: 'checkbox'
});
Checkbox.propTypes = _objectSpread({}, ComponentCommon.propTypes, CustomInput.propTypes);