import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router-dom';
import { AkContainerNavigationNested as NestedNav } from '@atlaskit/navigation';
import DefaultNav from './navigations/Default';
import PackagesNav from './navigations/Packages';
import DocsNav from './navigations/Docs';
import PatternsNav from './navigations/Patterns';

var Groups =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Groups, _React$Component);

  function Groups() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Groups);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Groups)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      parentRoute: null,
      stack: [[]]
    };
    return _this;
  }

  _createClass(Groups, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.resolveRoutes(this.context.router.route.location.pathname);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.resolveRoutes(nextContext.router.route.location.pathname);
    }
  }, {
    key: "resolveRoutes",
    value: function resolveRoutes(pathname) {
      var _this$props = this.props,
          docs = _this$props.docs,
          packages = _this$props.packages,
          patterns = _this$props.patterns;
      var menus = [React.createElement(Route, {
        path: "/"
      }, React.createElement(DefaultNav, {
        pathname: pathname
      })), React.createElement(Route, {
        path: "/docs"
      }, React.createElement(DocsNav, {
        pathname: pathname,
        docs: docs
      })), React.createElement(Route, {
        path: "/packages"
      }, React.createElement(PackagesNav, {
        pathname: pathname,
        packages: packages
      })), React.createElement(Route, {
        path: "/packages"
      }, React.createElement(PackagesNav, {
        pathname: pathname,
        packages: packages
      })), React.createElement(Route, {
        path: "/patterns"
      }, React.createElement(PatternsNav, {
        pathname: pathname,
        patterns: patterns
      }))];
      var stack = menus.filter(function (menu) {
        return matchPath(pathname, menu.props);
      }).map(function (menu) {
        return [React.cloneElement(menu, {
          key: menu.props.path
        })];
      });
      var parentRoute = stack.length > 1 ? stack[stack.length - 2][0].props.path : null;
      this.setState({
        parentRoute: parentRoute,
        stack: stack
      });
    }
  }, {
    key: "render",
    value: function render() {
      var stack = this.state.stack;
      return React.createElement(NestedNav, {
        stack: stack
      });
    }
  }]);

  return Groups;
}(React.Component);

Groups.contextTypes = {
  router: PropTypes.object
};
export { Groups as default };