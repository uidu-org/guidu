import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import OptionsProvider from './hoc/options-provider';

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));

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

  _createClass(Form, [{
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
      return React.createElement(OptionsProvider, this.props, React.createElement(Formsy, _extends({}, formsyProps, {
        ref: function ref(c) {
          _this2.form = c;
        },
        onValidSubmit: this.handleSubmit,
        onValid: this.enableButton,
        onInvalid: this.disableButton
      }), React.createElement("div", _extends({
        style: {
          position: 'relative'
        }
      }, inputsWrapperProps), loading && withLoader && React.createElement("div", {
        className: "form-loader"
      }, React.createElement("div", {
        className: "vertical-align"
      }, React.createElement("span", {
        className: "spinner"
      }, React.createElement("span", {
        className: "bounce1"
      }), React.createElement("span", {
        className: "bounce2"
      }), React.createElement("span", {
        className: "bounce3"
      })))), children), footerRenderer({
        loading: loading,
        canSubmit: canSubmit
      }, this.form, this.handleSubmit)));
    }
  }]);

  return Form;
}(Component);

export { Form as default };
Form.propTypes = {
  footerRenderer: PropTypes.func,
  handleSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  submitted: PropTypes.bool,
  withLoader: PropTypes.bool,
  inputsWrapperProps: PropTypes.shape(PropTypes.obj)
};
Form.defaultProps = {
  footerRenderer: function footerRenderer() {},
  handleSubmit: function handleSubmit() {},
  inputsWrapperProps: {},
  submitted: false,
  withLoader: true
};