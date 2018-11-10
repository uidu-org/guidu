"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formsyReact = _interopRequireDefault(require("formsy-react"));

var _optionsProvider = _interopRequireDefault(require("./hoc/options-provider"));

var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Form, _Component);

  function Form(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Form);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Form).call(this, props));

    _this.enableButton = function () {
      _this.setState({
        canSubmit: true
      });
    };

    _this.disableButton = function () {
      _this.setState({
        canSubmit: false
      });
    };

    _this.handleSubmit = function (model, resetForm) {
      var handleSubmit = _this.props.handleSubmit;
      var modelToSubmit = model;

      _this.setState({
        // canSubmit: false,
        loading: true
      }, function () {
        handleSubmit(modelToSubmit, resetForm);
      });
    };

    _this.state = {
      canSubmit: false,
      loading: false
    };
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.submitted) {
        this.setState({
          loading: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var formsyProps = Object.assign({}, this.props);
      delete formsyProps.elementWrapperClassName;
      delete formsyProps.inputsWrapperProps;
      delete formsyProps.labelClassName;
      delete formsyProps.layout;
      delete formsyProps.rowClassName;
      delete formsyProps.validatePristine;
      delete formsyProps.validateOnSubmit;
      delete formsyProps.handleSubmit;
      delete formsyProps.footerRenderer;
      delete formsyProps.submitted;
      delete formsyProps.withLoader;
      var _this$state = this.state,
          loading = _this$state.loading,
          canSubmit = _this$state.canSubmit;
      var _this$props = this.props,
          footerRenderer = _this$props.footerRenderer,
          children = _this$props.children,
          withLoader = _this$props.withLoader,
          inputsWrapperProps = _this$props.inputsWrapperProps;
      return _react.default.createElement(_optionsProvider.default, this.props, _react.default.createElement(_formsyReact.default, (0, _extends2.default)({}, formsyProps, {
        ref: function ref(c) {
          _this2.form = c;
        },
        onValidSubmit: this.handleSubmit,
        onValid: this.enableButton,
        onInvalid: this.disableButton
      }), _react.default.createElement("div", (0, _extends2.default)({
        style: {
          position: 'relative'
        }
      }, inputsWrapperProps), loading && withLoader && _react.default.createElement("div", {
        className: "form-loader"
      }, _react.default.createElement("div", {
        className: "vertical-align"
      }, _react.default.createElement("span", {
        className: "spinner"
      }, _react.default.createElement("span", {
        className: "bounce1"
      }), _react.default.createElement("span", {
        className: "bounce2"
      }), _react.default.createElement("span", {
        className: "bounce3"
      })))), children), footerRenderer({
        loading: loading,
        canSubmit: canSubmit
      }, this.form, this.handleSubmit)));
    }
  }]);
  return Form;
}(_react.Component);

exports.default = Form;
Form.propTypes = {
  footerRenderer: _propTypes.default.func,
  handleSubmit: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  submitted: _propTypes.default.bool,
  withLoader: _propTypes.default.bool,
  inputsWrapperProps: _propTypes.default.shape(_propTypes.default.obj)
};
Form.defaultProps = {
  footerRenderer: function footerRenderer() {},
  handleSubmit: function handleSubmit() {},
  inputsWrapperProps: {},
  submitted: false,
  withLoader: true
};
module.exports = exports.default;