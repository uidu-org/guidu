import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LaddaButton, { XL, SLIDE_UP } from 'react-ladda';

var FormSubmit =
/*#__PURE__*/
function (_Component) {
  _inherits(FormSubmit, _Component);

  function FormSubmit() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormSubmit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormSubmit)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

  _createClass(FormSubmit, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          canSubmit = _this$props2.canSubmit,
          loading = _this$props2.loading,
          buttonProps = _objectWithoutProperties(_this$props2, ["className", "canSubmit", "loading"]);

      return React.createElement(LaddaButton, _extends({}, buttonProps, {
        ref: this.initElementRef,
        type: "submit",
        loading: loading,
        className: classNames('btn', className),
        disabled: !canSubmit,
        "data-size": XL,
        "data-style": SLIDE_UP,
        "data-spinner-size": 30,
        "data-spinner-color": "#ddd",
        "data-spinner-lines": 12
      }), this.getActionBasedOnMethod());
    }
  }]);

  return FormSubmit;
}(Component);

export { FormSubmit as default };
FormSubmit.defaultProps = {
  className: 'btn-primary',
  label: null,
  method: 'POST',
  canSubmit: false,
  loading: false
};
FormSubmit.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  method: PropTypes.string,
  canSubmit: PropTypes.bool,
  loading: PropTypes.bool
};