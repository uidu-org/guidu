import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Provider } from 'unstated';
import { UIController, ViewController } from '../index';
import { CONTENT_NAV_WIDTH } from '../common/constants';
var LS_KEY = 'ATLASKIT_NAVIGATION_UI_STATE';
var DEFAULT_UI_STATE = {
  isPeekHinting: false,
  isPeeking: false,
  isCollapsed: false,
  productNavWidth: CONTENT_NAV_WIDTH,
  isResizeDisabled: false
};

function defaultGetCache() {
  if (typeof localStorage !== 'undefined') {
    var stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_UI_STATE;
  }

  return DEFAULT_UI_STATE;
}

function defaultSetCache(state) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }
}

var NavigationProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigationProvider, _Component);

  function NavigationProvider(props) {
    var _this;

    _classCallCheck(this, NavigationProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigationProvider).call(this, props));
    _this.uiState = void 0;
    _this.viewController = void 0;
    var cache = props.cache,
        initialPeekViewId = props.initialPeekViewId,
        initialUIController = props.initialUIController,
        isDebugEnabled = props.isDebugEnabled;
    _this.uiState = new UIController(initialUIController, cache);
    _this.viewController = new ViewController({
      isDebugEnabled: isDebugEnabled,
      initialPeekViewId: initialPeekViewId
    });
    return _this;
  }

  _createClass(NavigationProvider, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var viewController = this.viewController;
      var isDebugEnabled = this.props.isDebugEnabled;

      if (isDebugEnabled !== prevProps.isDebugEnabled) {
        viewController.setIsDebugEnabled(!!isDebugEnabled);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var uiState = this.uiState,
          viewController = this.viewController;
      return React.createElement(Provider, {
        inject: [uiState, viewController]
      }, children);
    }
  }]);

  return NavigationProvider;
}(Component);

NavigationProvider.defaultProps = {
  cache: {
    get: defaultGetCache,
    set: defaultSetCache
  },
  initialPeekViewId: null,
  isDebugEnabled: false
};
export { NavigationProvider as default };