import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

/**
 * NOTE: 'GlobalNav' is the layout primitive, which will be wrapped by the more
 * opinionated 'GlobalNavigation' component.
 */
import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { FirstPrimaryItemWrapper, PrimaryItemsList, SecondaryItemsList } from './primitives';

var GlobalNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(GlobalNavigation, _Component);

  function GlobalNavigation() {
    _classCallCheck(this, GlobalNavigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalNavigation).apply(this, arguments));
  }

  _createClass(GlobalNavigation, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          ItemComponent = _this$props.itemComponent,
          primaryItems = _this$props.primaryItems,
          secondaryItems = _this$props.secondaryItems,
          theme = _this$props.theme;
      var wrapperStyles = theme.mode.globalNav();
      return React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationLayer: 'global'
          },
          componentName: 'globalNav'
        }
      }, React.createElement("div", {
        css: wrapperStyles
      }, React.createElement(PrimaryItemsList, null, React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationIconGrouping: 'primary'
          }
        }
      }, React.createElement(Fragment, null, primaryItems.map(function (props, index) {
        // Render the first item with a margin beneath it and a large icon
        if (!index) {
          var Icon = props.icon,
              rest = _objectWithoutProperties(props, ["icon"]);

          return React.createElement(FirstPrimaryItemWrapper, {
            key: props.id || props.key || props.label
          }, React.createElement(ItemComponent, _extends({}, rest, {
            icon: function icon(provided) {
              return React.createElement(Icon, _extends({}, provided, {
                size: "large"
              }));
            },
            size: "large",
            index: index
          })));
        }

        return React.createElement(ItemComponent, _extends({}, props, {
          key: props.id || props.key || props.label,
          size: "large",
          index: index
        }));
      })))), React.createElement(SecondaryItemsList, null, React.createElement(NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationIconGrouping: 'secondary'
          }
        }
      }, React.createElement(Fragment, null, secondaryItems.map(function (props, index) {
        return React.createElement(ItemComponent, _extends({}, props, {
          key: props.id || props.label,
          size: "small",
          index: index
        }));
      }))))));
    }
  }]);

  return GlobalNavigation;
}(Component);

export { GlobalNavigation as default };