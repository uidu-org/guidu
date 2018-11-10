import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ComponentCommon, ErrorMessages, Help, Row } from '@uidu/field-base';

var CheckboxGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    var _this;

    _classCallCheck(this, CheckboxGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CheckboxGroup).call(this, props));

    _this.handleChange = function () {
      var _this$props = _this.props,
          options = _this$props.options,
          name = _this$props.name;
      var checkedOptions = options.filter(function (option) {
        return _this.elements[option.id].checked;
      });
      var value = checkedOptions.map(function (option) {
        return option.id;
      });

      _this.props.onSetValue(value);

      _this.props.onChange(name, value);
    };

    _this.renderElement = function () {
      var inputProps = Object.assign({}, _this.props);
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
      delete inputProps.options;

      var controls = _this.props.options.map(function (checkbox) {
        var checked = _this.props.value.indexOf(checkbox.id) !== -1;
        var disabled = checkbox.disabled || _this.props.disabled;
        return React.createElement("div", {
          className: classNames('custom-control custom-checkbox', _this.props.className),
          key: [_this.props.id, checkbox.id].join('-')
        }, React.createElement("input", _extends({}, inputProps, {
          className: "custom-control-input",
          id: [_this.props.id, checkbox.id].join('-'),
          ref: function ref(c) {
            _this.elements[checkbox.id] = c;
          },
          checked: checked,
          type: "checkbox",
          value: checkbox.id,
          onChange: _this.handleChange,
          disabled: disabled
        })), React.createElement("label", {
          className: "custom-control-label",
          htmlFor: [_this.props.id, checkbox.id].join('-')
        }, checkbox.label || checkbox.name));
      });

      if (_this.props.type === 'stacked') {
        return React.createElement("div", {
          className: "custom-controls-stacked"
        }, controls);
      }

      return controls;
    };

    _this.elements = {};
    return _this;
  }

  _createClass(CheckboxGroup, [{
    key: "render",
    value: function render() {
      var element = this.renderElement();

      if (this.props.layout === 'elementOnly') {
        return React.createElement("div", null, element);
      }

      return React.createElement(Row, _extends({}, this.props, {
        fakeLabel: true
      }), element, this.props.help ? React.createElement(Help, {
        help: this.props.help
      }) : null, this.props.showErrors ? React.createElement(ErrorMessages, {
        messages: this.props.errorMessages
      }) : null);
    }
  }]);

  return CheckboxGroup;
}(Component);

export { CheckboxGroup as default };
CheckboxGroup.propTypes = _objectSpread({}, ComponentCommon.propTypes, {
  options: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string
  })),
  value: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.oneOf(['inline', 'stacked'])
});
CheckboxGroup.defaultProps = _objectSpread({}, ComponentCommon.defaultProps, {
  type: 'stacked',
  options: [],
  value: []
});