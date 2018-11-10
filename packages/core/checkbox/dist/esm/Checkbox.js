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
import { ComponentCommon, ErrorMessages } from '@uidu/field-base';
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

    _this.componentWillReceiveProps = function (nextProps) {
      var _this$props = _this.props,
          onSetValue = _this$props.onSetValue,
          value = _this$props.value;
      var isValueChanging = nextProps.value !== value;

      if (isValueChanging) {
        onSetValue(nextProps.value);
      }
    };

    _this.changeValue = function (e) {
      var _this$props2 = _this.props,
          onSetValue = _this$props2.onSetValue,
          onChange = _this$props2.onChange,
          name = _this$props2.name;
      var value = e.currentTarget.checked;
      onSetValue(value);
      onChange(name, value);
    };

    _this.render = function () {
      var inputProps = Object.assign({}, _this.props);
      var _this$props3 = _this.props,
          id = _this$props3.id,
          disabled = _this$props3.disabled,
          label = _this$props3.label,
          value = _this$props3.value,
          showErrors = _this$props3.showErrors,
          errorMessages = _this$props3.errorMessages;
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
      delete inputProps.isIndeterminate;
      delete inputProps.isInvalid;
      delete inputProps.defaultChecked;
      delete inputProps.showErrors;
      return React.createElement(CustomInput, _extends({}, inputProps, {
        innerRef: function innerRef(r) {
          _this.checkbox = r;
        },
        checked: value,
        type: "checkbox",
        disabled: disabled,
        id: id,
        label: label,
        onChange: _this.changeValue
      }), showErrors && React.createElement(ErrorMessages, {
        messages: errorMessages
      }));
    };

    return _this;
  }

  _createClass(Checkbox, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var isIndeterminate = this.props.isIndeterminate;

      if (this.checkbox) {
        this.checkbox.indeterminate = !!isIndeterminate;
      }
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