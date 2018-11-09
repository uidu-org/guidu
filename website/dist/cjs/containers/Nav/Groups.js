"use strict";

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

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _navigation = require("@atlaskit/navigation");

var _Default = _interopRequireDefault(require("./navigations/Default"));

var _Packages = _interopRequireDefault(require("./navigations/Packages"));

var _Docs = _interopRequireDefault(require("./navigations/Docs"));

var _Patterns = _interopRequireDefault(require("./navigations/Patterns"));

var Groups =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Groups, _React$Component);

  function Groups() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Groups);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Groups)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      parentRoute: null,
      stack: [[]]
    };
    return _this;
  }

  (0, _createClass2.default)(Groups, [{
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
      var menus = [_react.default.createElement(_reactRouterDom.Route, {
        path: "/"
      }, _react.default.createElement(_Default.default, {
        pathname: pathname
      })), _react.default.createElement(_reactRouterDom.Route, {
        path: "/docs"
      }, _react.default.createElement(_Docs.default, {
        pathname: pathname,
        docs: docs
      })), _react.default.createElement(_reactRouterDom.Route, {
        path: "/packages"
      }, _react.default.createElement(_Packages.default, {
        pathname: pathname,
        packages: packages
      })), _react.default.createElement(_reactRouterDom.Route, {
        path: "/packages"
      }, _react.default.createElement(_Packages.default, {
        pathname: pathname,
        packages: packages
      })), _react.default.createElement(_reactRouterDom.Route, {
        path: "/patterns"
      }, _react.default.createElement(_Patterns.default, {
        pathname: pathname,
        patterns: patterns
      }))];
      var stack = menus.filter(function (menu) {
        return (0, _reactRouterDom.matchPath)(pathname, menu.props);
      }).map(function (menu) {
        return [_react.default.cloneElement(menu, {
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
      return _react.default.createElement(_navigation.AkContainerNavigationNested, {
        stack: stack
      });
    }
  }]);
  return Groups;
}(_react.default.Component);

exports.default = Groups;
Groups.contextTypes = {
  router: _propTypes.default.object
};
module.exports = exports.default;