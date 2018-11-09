"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf4 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _layerManager = _interopRequireDefault(require("@atlaskit/layer-manager"));

var _modalDialog = require("@atlaskit/modal-dialog");

var _page = _interopRequireWildcard(require("@atlaskit/page"));

var _theme = require("@atlaskit/theme");

var _Home = _interopRequireDefault(require("../pages/Home"));

var _FourOhFour = _interopRequireDefault(require("../pages/FourOhFour"));

var _Package = _interopRequireDefault(require("../pages/Package"));

var _Nav = _interopRequireDefault(require("./Nav"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  #app {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// eslint-disable-next-line
(0, _styledComponents.injectGlobal)(_templateObject());

var AppContent = _styledComponents.default.div.withConfig({
  displayName: "App__AppContent",
  componentId: "p6k19o-0"
})(["\n  flex: 1 1 auto;\n"]);

var ScrollToTop =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ScrollToTop, _Component);

  function ScrollToTop() {
    (0, _classCallCheck2.default)(this, ScrollToTop);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf4.default)(ScrollToTop).apply(this, arguments));
  }

  (0, _createClass2.default)(ScrollToTop, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return ScrollToTop;
}(_react.Component);

var ScrollHandler = (0, _reactRouter.withRouter)(ScrollToTop);

var Boundary =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Boundary, _Component2);

  function Boundary() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Boundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(Boundary)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  (0, _createClass2.default)(Boundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        hasError: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var hasError = this.state.hasError;

      if (hasError) {
        return _react.default.createElement(_FourOhFour.default, null);
      }

      return this.props.children;
    }
  }]);
  return Boundary;
}(_react.Component);

var App =
/*#__PURE__*/
function (_Component3) {
  (0, _inherits2.default)(App, _Component3);

  function App() {
    var _getPrototypeOf3;

    var _this2;

    (0, _classCallCheck2.default)(this, App);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(App)).call.apply(_getPrototypeOf3, [this].concat(args)));
    _this2.state = {
      mode: 'light'
    };

    _this2.handleKeyup = function (e) {
      // We only currently allow toggling dark-mode in dev-mode. Once we have
      // landed on a proper GUI implementation, we should remove the dev-mode
      // check, shipping both the GUI and keyboard shortcut to production.
      if (process.env.NODE_ENV === 'development') {
        var canHandleKey = document.activeElement === document.body;

        if (canHandleKey && e.key === 'd') {
          _this2.setState(function (state) {
            return {
              mode: state.mode === 'light' ? 'dark' : 'light'
            };
          });
        }
      }
    };

    return _this2;
  }

  (0, _createClass2.default)(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keyup', this.handleKeyup);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keyup', this.handleKeyup);
    }
  }, {
    key: "render",
    value: function render() {
      var mode = this.state.mode;

      var theme = function theme() {
        return {
          mode: mode
        };
      };

      return _react.default.createElement(_theme.Theme, {
        values: theme
      }, _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement("div", null, _react.default.createElement(_reactRouterDom.Route, null, _react.default.createElement(ScrollHandler, null)), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, null, _react.default.createElement(_layerManager.default, null, _react.default.createElement(_page.default, {
        navigation: _react.default.createElement(_Nav.default, null)
      }, _react.default.createElement(Boundary, null, _react.default.createElement(_page.Grid, null, _react.default.createElement(_page.GridColumn, null, _react.default.createElement(AppContent, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        path: "/mk-2",
        render: function render(props) {
          return _react.default.createElement(_reactRouterDom.Redirect, {
            to: props.location.pathname.replace('/mk-2', '')
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/components",
        render: function render(props) {
          return _react.default.createElement(_reactRouterDom.Redirect, {
            to: props.location.pathname.replace('/components', '/packages/core')
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/",
        component: _Home.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/docs/:docId*",
        component: Document
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/packages/:pkgId",
        component: _Package.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/error",
        component: _FourOhFour.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        component: _FourOhFour.default
      })))))))))))));
    }
  }]);
  return App;
}(_react.Component);

exports.default = App;
module.exports = exports.default;