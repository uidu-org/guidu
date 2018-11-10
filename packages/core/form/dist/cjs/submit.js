"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLadda = _interopRequireWildcard(require("react-ladda"));

var FormSubmit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FormSubmit, _Component);

  function FormSubmit() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FormSubmit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormSubmit)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.getActionBasedOnMethod = function () {
      var _this$props = _this.props,
          label = _this$props.label,
          method = _this$props.method;
      return label || (method === 'POST' ? 'Save' : 'Update');
    };

    _this.initElementRef = function (control) {
      _this.element = control ? control.node : null;
    };

    return _this;
  }

  (0, _createClass2.default)(FormSubmit, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          canSubmit = _this$props2.canSubmit,
          loading = _this$props2.loading,
          buttonProps = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "canSubmit", "loading"]);
      return _react.default.createElement(_reactLadda.default, (0, _extends2.default)({}, buttonProps, {
        ref: this.initElementRef,
        type: "submit",
        loading: loading,
        className: (0, _classnames.default)('btn', className),
        disabled: !canSubmit,
        "data-size": _reactLadda.XL,
        "data-style": _reactLadda.SLIDE_UP,
        "data-spinner-size": 30,
        "data-spinner-color": "#ddd",
        "data-spinner-lines": 12
      }), this.getActionBasedOnMethod());
    }
  }]);
  return FormSubmit;
}(_react.Component);

exports.default = FormSubmit;
FormSubmit.defaultProps = {
  className: 'btn-primary',
  label: null,
  method: 'POST',
  canSubmit: false,
  loading: false
};
FormSubmit.propTypes = {
  className: _propTypes.default.string,
  label: _propTypes.default.node,
  method: _propTypes.default.string,
  canSubmit: _propTypes.default.bool,
  loading: _propTypes.default.bool
};
module.exports = exports.default;