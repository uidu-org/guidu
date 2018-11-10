import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component, Fragment } from 'react';
import Transition from 'react-transition-group/Transition';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { transitionDurationMs } from '../../../../common/constants';
import { ContainerNavigation, InnerShadow, ProductNavigation } from './primitives';

var ContentNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(ContentNavigation, _Component);

  function ContentNavigation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContentNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContentNavigation)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.isMounted = false;
    return _this;
  }

  _createClass(ContentNavigation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMounted = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Container = _this$props.container,
          isPeekHinting = _this$props.isPeekHinting,
          isPeeking = _this$props.isPeeking,
          isVisible = _this$props.isVisible,
          Product = _this$props.product;
      return React.createElement(Fragment, null, React.createElement(ProductNavigation, null, isVisible ? React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationLayer: 'product'
          }
        }
      }, React.createElement(Product, null)) : null), React.createElement(Transition, {
        in: !!Container,
        timeout: this.isMounted ? transitionDurationMs : 0,
        mountOnEnter: true,
        unmountOnExit: true
      }, function (state) {
        return React.createElement(ContainerNavigation, {
          isEntering: state === 'entering',
          isExiting: state === 'exiting',
          isPeekHinting: isPeekHinting,
          isPeeking: isPeeking
        }, React.createElement(NavigationAnalyticsContext, {
          data: {
            attributes: {
              navigationLayer: 'container'
            }
          }
        }, React.createElement(Fragment, null, isVisible && Container ? React.createElement(Container, null) : null)));
      }), React.createElement(InnerShadow, {
        isVisible: isPeeking
      }));
    }
  }]);

  return ContentNavigation;
}(Component);

export { ContentNavigation as default };