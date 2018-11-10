"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AtlaskitIcon = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _WrappedLink = require("../../components/WrappedLink");

var _navigation = _interopRequireWildcard(require("@atlaskit/navigation"));

var _theme = require("@atlaskit/theme");

var _tooltip = _interopRequireDefault(require("@atlaskit/tooltip"));

var _search = _interopRequireDefault(require("@atlaskit/icon/glyph/search"));

var _menu = _interopRequireDefault(require("@atlaskit/icon/glyph/menu"));

var _component = _interopRequireDefault(require("@atlaskit/icon/glyph/component"));

var _overview = _interopRequireDefault(require("@atlaskit/icon/glyph/overview"));

var _issues = _interopRequireDefault(require("@atlaskit/icon/glyph/issues"));

var _Groups = _interopRequireDefault(require("./Groups"));

var _GroupDrawer = _interopRequireDefault(require("./GroupDrawer"));

var _atlaskitLogoInverted = _interopRequireDefault(require("../../assets/atlaskit-logo-inverted.png"));

var _atlaskitLogoMonochrome = _interopRequireDefault(require("../../assets/atlaskit-logo-monochrome.png"));

var _packages = _interopRequireDefault(require("../../packages"));

// import SearchDrawer from './SearchDrawer';
var docs = [];
var patterns = [];

var IconWrapper = _styledComponents.default.div.withConfig({
  displayName: "Nav__IconWrapper",
  componentId: "sc-1oc6d5a-0"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", "px;\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  width: 40px;\n"], function (p) {
  return p.color;
}, _theme.borderRadius);

var HeaderIcon = function HeaderIcon(_ref) {
  var Icon = _ref.icon,
      color = _ref.color,
      label = _ref.label;
  return _react.default.createElement(IconWrapper, {
    color: color
  }, _react.default.createElement(Icon, {
    label: label,
    primaryColor: _theme.colors.N0
  }));
};

var headers = {
  docs: {
    icon: _overview.default,
    color: _theme.colors.P300,
    label: 'Documentation'
  },
  packages: {
    icon: _component.default,
    color: _theme.colors.R300,
    label: 'Packages'
  },
  patterns: {
    icon: _issues.default,
    color: _theme.colors.G300,
    label: 'Patterns'
  }
};

var AtlaskitIcon = function AtlaskitIcon(_ref2) {
  var monochrome = _ref2.monochrome;
  return _react.default.createElement("img", {
    alt: "Atlaskit logo",
    height: "24",
    src: monochrome ? _atlaskitLogoMonochrome.default : _atlaskitLogoInverted.default,
    style: {
      display: 'block'
    },
    width: "24"
  });
};

exports.AtlaskitIcon = AtlaskitIcon;

var Nav =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Nav, _Component);

  function Nav() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Nav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Nav)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      groupDrawerOpen: false,
      searchDrawerOpen: false,
      searchDrawerValue: ''
    };

    _this.openGroupDrawer = function () {
      return _this.setState({
        groupDrawerOpen: true
      });
    };

    _this.closeGroupDrawer = function () {
      return _this.setState({
        groupDrawerOpen: false
      });
    };

    _this.openSearchDrawer = function () {
      return _this.setState({
        searchDrawerOpen: true
      });
    };

    _this.closeSearchDrawer = function () {
      return _this.setState({
        searchDrawerOpen: false,
        searchDrawerValue: ''
      });
    };

    _this.updateSearchValue = function (e) {
      return _this.setState({
        searchDrawerValue: e.target.value
      });
    };

    return _this;
  }

  (0, _createClass2.default)(Nav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          groupDrawerOpen = _this$state.groupDrawerOpen,
          searchDrawerOpen = _this$state.searchDrawerOpen,
          searchDrawerValue = _this$state.searchDrawerValue;
      return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        render: function render(_ref3) {
          var location = _ref3.location;
          var containerNavAvailable = location.pathname !== '/';
          var theme = containerNavAvailable ? null : _navigation.presetThemes.global;
          var headerKey = location.pathname.split('/').filter(function (p) {
            return p;
          })[0];
          var header = headers[headerKey];

          var groups = _react.default.createElement(_Groups.default, {
            docs: docs,
            packages: _packages.default,
            patterns: patterns
          }); // const groups = null;


          return _react.default.createElement(_navigation.default, {
            isOpen: containerNavAvailable,
            containerTheme: theme,
            isCollapsible: !containerNavAvailable,
            isResizeable: false,
            globalPrimaryIcon: _react.default.createElement(_tooltip.default, {
              content: "Home",
              position: "right"
            }, _react.default.createElement(AtlaskitIcon, null)),
            globalCreateIcon: _react.default.createElement(_tooltip.default, {
              content: "Menu",
              position: "right"
            }, _react.default.createElement(_menu.default, {
              label: "Menu"
            })),
            globalPrimaryItemHref: '/',
            globalSearchIcon: _react.default.createElement(_tooltip.default, {
              content: "Search",
              position: "right"
            }, _react.default.createElement(_search.default, {
              label: "search"
            })),
            onSearchDrawerOpen: _this2.openSearchDrawer,
            onCreateDrawerOpen: _this2.openGroupDrawer,
            containerHeaderComponent: function containerHeaderComponent() {
              return containerNavAvailable && header && _react.default.createElement(_navigation.AkContainerTitle, {
                icon: _react.default.createElement(HeaderIcon, header),
                text: header.label,
                href: "/".concat(headerKey),
                linkComponent: (0, _recompose.toClass)(function (_ref4) {
                  var href = _ref4.href,
                      children = _ref4.children,
                      className = _ref4.className;
                  return _react.default.createElement(_WrappedLink.Link, {
                    to: href,
                    className: className
                  }, children);
                })
              });
            },
            drawers: [// <SearchDrawer
            //   isOpen={searchDrawerOpen}
            //   closeDrawer={this.closeSearchDrawer}
            //   searchDrawerValue={searchDrawerValue}
            //   updateSearchValue={this.updateSearchValue}
            //   packages={packages}
            //   key="searchDrawer"
            // />,
            _react.default.createElement(_GroupDrawer.default, {
              key: "groupDrawer",
              isOpen: groupDrawerOpen,
              closeDrawer: _this2.closeGroupDrawer,
              docs: docs,
              pathname: location.pathname,
              packages: _packages.default,
              patterns: patterns
            }, groups)]
          }, containerNavAvailable && groups);
        }
      }));
    }
  }]);
  return Nav;
}(_react.Component);

exports.default = Nav;