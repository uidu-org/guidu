import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  #app {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled, { injectGlobal } from 'styled-components';
import LayerManager from '@atlaskit/layer-manager';
import { ModalTransition } from '@atlaskit/modal-dialog';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Theme } from '@atlaskit/theme';
import Home from '../pages/Home'; // import ChangeLogExplorer from '../pages/ChangeLogExplorer';
// import Examples from '../pages/Examples';

import FourOhFour from '../pages/FourOhFour'; // import Pattern from '../pages/Pattern';
// import PatternsInfo from '../pages/PatternsInfo';
// import Document from '../pages/Document';

import Package from '../pages/Package'; // import PackagesList from '../pages/PackagesList';
// import PackageDocument from '../pages/PackageDocument';
// import ChangelogModal from '../pages/Package/ChangelogModal';
// import ExamplesModal from '../pages/Package/ExamplesModal';
// import AnalyticsListeners from '../components/Analytics/AnalyticsListeners';

import Nav from './Nav'; // eslint-disable-next-line

injectGlobal(_templateObject());
var AppContent = styled.div.withConfig({
  displayName: "App__AppContent",
  componentId: "p6k19o-0"
})(["\n  flex: 1 1 auto;\n"]);

var ScrollToTop =
/*#__PURE__*/
function (_Component) {
  _inherits(ScrollToTop, _Component);

  function ScrollToTop() {
    _classCallCheck(this, ScrollToTop);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScrollToTop).apply(this, arguments));
  }

  _createClass(ScrollToTop, [{
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
}(Component);

var ScrollHandler = withRouter(ScrollToTop);

var Boundary =
/*#__PURE__*/
function (_Component2) {
  _inherits(Boundary, _Component2);

  function Boundary() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Boundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Boundary)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(Boundary, [{
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
        return React.createElement(FourOhFour, null);
      }

      return this.props.children;
    }
  }]);

  return Boundary;
}(Component);

var App =
/*#__PURE__*/
function (_Component3) {
  _inherits(App, _Component3);

  function App() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, App);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(App)).call.apply(_getPrototypeOf3, [this].concat(args)));
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

  _createClass(App, [{
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

      return React.createElement(Theme, {
        values: theme
      }, React.createElement(BrowserRouter, null, React.createElement("div", null, React.createElement(Route, null, React.createElement(ScrollHandler, null)), React.createElement(Switch, null, React.createElement(Route, null, React.createElement(LayerManager, null, React.createElement(Page, {
        navigation: React.createElement(Nav, null)
      }, React.createElement(Boundary, null, React.createElement(Grid, null, React.createElement(GridColumn, null, React.createElement(AppContent, null, React.createElement(Switch, null, React.createElement(Route, {
        path: "/mk-2",
        render: function render(props) {
          return React.createElement(Redirect, {
            to: props.location.pathname.replace('/mk-2', '')
          });
        }
      }), React.createElement(Route, {
        path: "/components",
        render: function render(props) {
          return React.createElement(Redirect, {
            to: props.location.pathname.replace('/components', '/packages/core')
          });
        }
      }), React.createElement(Route, {
        exact: true,
        path: "/",
        component: Home
      }), React.createElement(Route, {
        path: "/docs/:docId*",
        component: Document
      }), React.createElement(Route, {
        path: "/packages/:pkgId",
        component: Package
      }), React.createElement(Route, {
        path: "/error",
        component: FourOhFour
      }), React.createElement(Route, {
        component: FourOhFour
      })))))))))))));
    }
  }]);

  return App;
}(Component);

export { App as default };