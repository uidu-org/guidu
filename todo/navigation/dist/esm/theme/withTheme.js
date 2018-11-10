import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { channel } from 'emotion-theming';
import PropTypes from 'prop-types';
import { light } from './modes';

var withTheme = function withTheme(defaultTheme) {
  return function (WrappedComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(WithTheme, _Component);

      function WithTheme() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, WithTheme);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithTheme)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _this.state = {
          theme: undefined
        };
        _this.unsubscribeId = void 0;
        return _this;
      }

      _createClass(WithTheme, [{
        key: "subscribeToContext",
        value: function subscribeToContext() {
          var _this2 = this;

          if (this.unsubscribeId && this.unsubscribeId !== -1) {
            return;
          }

          var themeContext = this.context[channel];

          if (themeContext !== undefined) {
            this.unsubscribeId = themeContext.subscribe(function (theme) {
              _this2.setState({
                theme: theme
              });
            });
          }
        }
      }, {
        key: "componentWillMount",
        value: function componentWillMount() {
          this.subscribeToContext();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.subscribeToContext();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.unsubscribeId && this.unsubscribeId !== -1) {
            this.context[channel].unsubscribe(this.unsubscribeId);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var theme = this.state.theme || defaultTheme;
          return React.createElement(WrappedComponent, _extends({
            theme: theme
          }, this.props));
        }
      }]);

      return WithTheme;
    }(Component), _class.contextTypes = _defineProperty({}, channel, PropTypes.object), _class.displayName = "WithTheme(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"), _temp;
  };
};

var defaultContentTheme = {
  mode: light,
  context: 'container'
};
var defaultGlobalTheme = {
  mode: light
};
export var withContentTheme = withTheme(defaultContentTheme);
export var withGlobalTheme = withTheme(defaultGlobalTheme);
export default withTheme;