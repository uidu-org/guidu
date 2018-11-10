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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fieldBase = require("@uidu/field-base");

var Checkbox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Checkbox, _Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Checkbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "changeValue", function (e) {
      var onSetValue = _this.props.onSetValue;
      var value = e.currentTarget.checked;

      _this.props.onSetValue(value);

      _this.props.onChange(_this.props.name, value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderElement", function () {
      var inputProps = Object.assign({}, _this.props);
      var checked = _this.props.value === true;
      var _this$props = _this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          label = _this$props.label;
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
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('custom-control custom-checkbox', className)
      }, _react.default.createElement("input", (0, _extends2.default)({}, inputProps, {
        id: _this.props.id,
        className: "custom-control-input",
        type: "checkbox",
        checked: checked,
        onChange: _this.changeValue,
        disabled: _this.props.disabled || disabled
      })), _react.default.createElement("label", {
        className: "custom-control-label d-flex align-items-center",
        htmlFor: _this.props.id
      }, label));
    });
    return _this;
  }

  (0, _createClass2.default)(Checkbox, [{
    key: "render",
    value: function render() {
      var element = this.renderElement();
      console.log(this.props);

      if (this.props.layout === 'elementOnly') {
        return element;
      }

      return _react.default.createElement(_fieldBase.Row, (0, _extends2.default)({}, this.props, {
        // label={this.props.rowLabel}
        htmlFor: this.props.id,
        fakeLabel: true
      }), element, this.props.help ? _react.default.createElement(_fieldBase.Help, {
        help: this.props.help
      }) : null, this.props.showErrors ? _react.default.createElement(_fieldBase.ErrorMessages, {
        messages: this.props.errorMessages
      }) : null);
    }
  }]);
  return Checkbox;
}(_react.Component);

exports.default = Checkbox;
Checkbox.defaultProps = (0, _objectSpread2.default)({}, _fieldBase.ComponentCommon.defaultProps);
Checkbox.propTypes = (0, _objectSpread2.default)({}, _fieldBase.ComponentCommon.propTypes);
module.exports = exports.default;