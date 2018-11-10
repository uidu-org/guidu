import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { toClass } from 'recompose';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Link } from '../../components/WrappedLink';
import Navigation, { AkContainerTitle, presetThemes } from '@atlaskit/navigation';
import { borderRadius, colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';
import SearchIcon from '@atlaskit/icon/glyph/search';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import DocumentationIcon from '@atlaskit/icon/glyph/overview';
import PatternsIcon from '@atlaskit/icon/glyph/issues';
import Groups from './Groups';
import GroupDrawer from './GroupDrawer'; // import SearchDrawer from './SearchDrawer';

import atlaskitLogo from '../../assets/atlaskit-logo-inverted.png';
import atlaskitLogoMonochrome from '../../assets/atlaskit-logo-monochrome.png';
import packages from '../../packages';
var docs = [];
var patterns = [];
var IconWrapper = styled.div.withConfig({
  displayName: "Nav__IconWrapper",
  componentId: "sc-1oc6d5a-0"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", "px;\n  display: flex;\n  height: 40px;\n  justify-content: center;\n  width: 40px;\n"], function (p) {
  return p.color;
}, borderRadius);

var HeaderIcon = function HeaderIcon(_ref) {
  var Icon = _ref.icon,
      color = _ref.color,
      label = _ref.label;
  return React.createElement(IconWrapper, {
    color: color
  }, React.createElement(Icon, {
    label: label,
    primaryColor: colors.N0
  }));
};

var headers = {
  docs: {
    icon: DocumentationIcon,
    color: colors.P300,
    label: 'Documentation'
  },
  packages: {
    icon: PackagesIcon,
    color: colors.R300,
    label: 'Packages'
  },
  patterns: {
    icon: PatternsIcon,
    color: colors.G300,
    label: 'Patterns'
  }
};
export var AtlaskitIcon = function AtlaskitIcon(_ref2) {
  var monochrome = _ref2.monochrome;
  return React.createElement("img", {
    alt: "Atlaskit logo",
    height: "24",
    src: monochrome ? atlaskitLogoMonochrome : atlaskitLogo,
    style: {
      display: 'block'
    },
    width: "24"
  });
};

var Nav =
/*#__PURE__*/
function (_Component) {
  _inherits(Nav, _Component);

  function Nav() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Nav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Nav)).call.apply(_getPrototypeOf2, [this].concat(args)));
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

  _createClass(Nav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          groupDrawerOpen = _this$state.groupDrawerOpen,
          searchDrawerOpen = _this$state.searchDrawerOpen,
          searchDrawerValue = _this$state.searchDrawerValue;
      return React.createElement(Switch, null, React.createElement(Route, {
        render: function render(_ref3) {
          var location = _ref3.location;
          var containerNavAvailable = location.pathname !== '/';
          var theme = containerNavAvailable ? null : presetThemes.global;
          var headerKey = location.pathname.split('/').filter(function (p) {
            return p;
          })[0];
          var header = headers[headerKey];
          var groups = React.createElement(Groups, {
            docs: docs,
            packages: packages,
            patterns: patterns
          }); // const groups = null;

          return React.createElement(Navigation, {
            isOpen: containerNavAvailable,
            containerTheme: theme,
            isCollapsible: !containerNavAvailable,
            isResizeable: false,
            globalPrimaryIcon: React.createElement(Tooltip, {
              content: "Home",
              position: "right"
            }, React.createElement(AtlaskitIcon, null)),
            globalCreateIcon: React.createElement(Tooltip, {
              content: "Menu",
              position: "right"
            }, React.createElement(MenuIcon, {
              label: "Menu"
            })),
            globalPrimaryItemHref: '/',
            globalSearchIcon: React.createElement(Tooltip, {
              content: "Search",
              position: "right"
            }, React.createElement(SearchIcon, {
              label: "search"
            })),
            onSearchDrawerOpen: _this2.openSearchDrawer,
            onCreateDrawerOpen: _this2.openGroupDrawer,
            containerHeaderComponent: function containerHeaderComponent() {
              return containerNavAvailable && header && React.createElement(AkContainerTitle, {
                icon: React.createElement(HeaderIcon, header),
                text: header.label,
                href: "/".concat(headerKey),
                linkComponent: toClass(function (_ref4) {
                  var href = _ref4.href,
                      children = _ref4.children,
                      className = _ref4.className;
                  return React.createElement(Link, {
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
            React.createElement(GroupDrawer, {
              key: "groupDrawer",
              isOpen: groupDrawerOpen,
              closeDrawer: _this2.closeGroupDrawer,
              docs: docs,
              pathname: location.pathname,
              packages: packages,
              patterns: patterns
            }, groups)]
          }, containerNavAvailable && groups);
        }
      }));
    }
  }]);

  return Nav;
}(Component);

export { Nav as default };