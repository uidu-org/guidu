"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _Checkbox = _interopRequireDefault(require("../src/Checkbox"));

var BasicUsageExample =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(BasicUsageExample, _PureComponent);

  function BasicUsageExample() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, BasicUsageExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(BasicUsageExample)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      onChangeResult: 'Check & Uncheck to trigger onChange'
    };

    _this.onChange = function (event) {
      _this.setState({
        onChangeResult: "onChange called with value: ".concat(event.target.value, " isChecked: ").concat(event.target.checked)
      });
    };

    return _this;
  }

  (0, _createClass2.default)(BasicUsageExample, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_Checkbox.default, {
        value: "Basic checkbox",
        label: "Basic checkbox",
        onChange: this.onChange,
        name: "checkbox-basic"
      }), _react.default.createElement(_Checkbox.default, {
        defaultChecked: true,
        label: "Checked by default",
        value: "Checked by default",
        onChange: this.onChange,
        name: "checkbox-checked"
      }), _react.default.createElement(_Checkbox.default, {
        isDisabled: true,
        label: "Disabled",
        value: "Disabled",
        onChange: this.onChange,
        name: "checkbox-disabled"
      }), _react.default.createElement(_Checkbox.default, {
        isInvalid: true,
        label: "Invalid",
        value: "Invalid",
        onChange: this.onChange,
        name: "checkbox-invalid"
      }), _react.default.createElement(_Checkbox.default, {
        isFullWidth: true,
        label: "Full Width",
        value: "Full Width",
        onChange: this.onChange,
        name: "checkbox-fullwidth"
      }), _react.default.createElement("div", {
        style: {
          borderStyle: 'dashed',
          borderWidth: '1px',
          borderColor: '#ccc',
          padding: '0.5em',
          color: '#ccc',
          margin: '0.5em'
        }
      }, this.state.onChangeResult));
    }
  }]);
  return BasicUsageExample;
}(_react.PureComponent);

var _default = BasicUsageExample;
exports.default = _default;
module.exports = exports.default;