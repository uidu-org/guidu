"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fieldBase = require("@uidu/field-base");

// import ControlCommon from './controls/control-common';
var CheckboxGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CheckboxGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CheckboxGroup).call(this, props));

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
      Object.keys(_fieldBase.ComponentCommon.propTypes).forEach(function (key) {
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
        return _react.default.createElement("div", {
          className: (0, _classnames.default)('custom-control custom-checkbox', _this.props.className),
          key: [_this.props.id, checkbox.id].join('-')
        }, _react.default.createElement("input", (0, _extends2.default)({}, inputProps, {
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
        })), _react.default.createElement("label", {
          className: "custom-control-label",
          htmlFor: [_this.props.id, checkbox.id].join('-')
        }, checkbox.label || checkbox.name));
      });

      if (_this.props.type === 'stacked') {
        return _react.default.createElement("div", {
          className: "custom-controls-stacked"
        }, controls);
      }

      return controls;
    };

    _this.elements = {};
    return _this;
  }

  (0, _createClass2.default)(CheckboxGroup, [{
    key: "render",
    value: function render() {
      var element = this.renderElement();

      if (this.props.layout === 'elementOnly') {
        return _react.default.createElement("div", null, element);
      }

      return _react.default.createElement(_fieldBase.Row, (0, _extends2.default)({}, this.props, {
        fakeLabel: true
      }), element, this.props.help ? _react.default.createElement(_fieldBase.Help, {
        help: this.props.help
      }) : null, this.props.showErrors ? _react.default.createElement(_fieldBase.ErrorMessages, {
        messages: this.props.errorMessages
      }) : null);
    }
  }]);
  return CheckboxGroup;
}(_react.Component);

exports.default = CheckboxGroup;
CheckboxGroup.propTypes = (0, _objectSpread2.default)({}, _fieldBase.ComponentCommon.propTypes, {
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    disabled: _propTypes.default.bool,
    value: _propTypes.default.string,
    label: _propTypes.default.string
  })),
  value: _propTypes.default.arrayOf(_propTypes.default.number),
  type: _propTypes.default.oneOf(['inline', 'stacked'])
});
CheckboxGroup.defaultProps = (0, _objectSpread2.default)({}, _fieldBase.ComponentCommon.defaultProps, {
  type: 'stacked',
  options: [],
  value: []
});
module.exports = exports.default;