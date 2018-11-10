import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { GlobalItemPrimitive } from '../../../';
import InteractionStateManager from '../InteractionStateManager';
import { UIController, UIControllerSubscriber } from '../../../ui-controller';
import { ViewController, withNavigationViewController } from '../../../view-controller';

var PeekToggle =
/*#__PURE__*/
function (_Component) {
  _inherits(PeekToggle, _Component);

  function PeekToggle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PeekToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PeekToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function () {
      var _this$props = _this.props,
          isPeeking = _this$props.isPeeking,
          navigationUIController = _this$props.navigationUIController,
          navigationViewController = _this$props.navigationViewController;

      if (!isPeeking && navigationViewController.initialPeekViewId) {
        navigationViewController.setPeekView(navigationViewController.initialPeekViewId);
      }

      navigationUIController.togglePeek();
    };

    _this.renderIcon = function () {
      return _this.props.isPeeking ? ArrowLeftIcon : MenuIcon;
    };

    _this.renderComponent = function (_ref) {
      var className = _ref.className,
          children = _ref.children;

      var isHomeViewActive = _this.getIsHomeViewActive();

      var _this$props2 = _this.props,
          isPeeking = _this$props2.isPeeking,
          navigationUIController = _this$props2.navigationUIController;
      return React.createElement("button", {
        className: className,
        onClick: isHomeViewActive && !isPeeking ? null : _this.handleClick,
        onMouseEnter: navigationUIController.peekHint,
        onMouseLeave: navigationUIController.unPeekHint
      }, children);
    };

    return _this;
  }

  _createClass(PeekToggle, [{
    key: "getIsHomeViewActive",
    value: function getIsHomeViewActive() {
      var _this$props$navigatio = this.props.navigationViewController.state,
          activeView = _this$props$navigatio.activeView,
          activePeekView = _this$props$navigatio.activePeekView;

      if (!activeView || !activePeekView) {
        return false;
      }

      return activeView.id === activePeekView.id;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          label = _this$props3.label,
          tooltip = _this$props3.tooltip;
      var isPeeking = this.props.isPeeking;
      var isHomeViewActive = this.getIsHomeViewActive();
      return React.createElement(InteractionStateManager, null, function (_ref2) {
        var isActive = _ref2.isActive,
            isHover = _ref2.isHover;
        return React.createElement(GlobalItemPrimitive, {
          isActive: isActive,
          component: _this2.renderComponent,
          icon: _this2.renderIcon(),
          isHover: isHover || isHomeViewActive || isPeeking,
          label: label,
          tooltip: !isHomeViewActive && !isPeeking && tooltip
        });
      });
    }
  }]);

  return PeekToggle;
}(Component);

PeekToggle.defaultProps = {
  label: 'Main menu',
  tooltip: 'Main menu'
};

var PeekToggleWithUIController = function PeekToggleWithUIController(props) {
  return React.createElement(UIControllerSubscriber, null, function (navigationUIController) {
    return React.createElement(PeekToggle, _extends({
      isPeeking: navigationUIController.state.isPeeking,
      navigationUIController: navigationUIController
    }, props));
  });
};

export default withNavigationViewController(PeekToggleWithUIController);