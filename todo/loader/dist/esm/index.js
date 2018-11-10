import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

var Loader =
/*#__PURE__*/
function (_Component) {
  _inherits(Loader, _Component);

  function Loader() {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, _getPrototypeOf(Loader).apply(this, arguments));
  }

  _createClass(Loader, [{
    key: "render",
    value: function render() {
      if (this.props.loaded) {
        return this.props.children;
      }

      return React.createElement("div", {
        className: this.props.wrapperClassName
      }, React.createElement(Spinner, {
        name: this.props.name,
        color: this.props.color,
        className: this.props.className,
        fadeIn: "none"
      }));
    }
  }]);

  return Loader;
}(Component);

export { Loader as default };
Loader.propTypes = {
  loaded: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string
};
Loader.defaultProps = {
  loaded: false,
  children: null,
  name: 'wave',
  color: 'red',
  className: null,
  wrapperClassName: 'd-flex align-items-center justify-content-center h-100'
};