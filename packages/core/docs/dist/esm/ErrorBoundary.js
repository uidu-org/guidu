import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';

var ErrorBoundary =
/*#__PURE__*/
function (_Component) {
  _inherits(ErrorBoundary, _Component);

  function ErrorBoundary() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ErrorBoundary)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var onError = this.props.onError;
      this.setState({
        hasError: true
      });

      if (onError) {
        onError(error, info);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return React.createElement("h4", null, "Something went wrong loading this example.");
      }

      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(Component);

export { ErrorBoundary as default };