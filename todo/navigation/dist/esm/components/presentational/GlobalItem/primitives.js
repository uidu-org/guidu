import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Fragment, Component } from 'react';
import { css } from 'emotion';
import Tooltip from '@atlaskit/tooltip';
import { styleReducerNoOp, withGlobalTheme } from '../../../theme';

var GlobalNavigationItemPrimitive =
/*#__PURE__*/
function (_Component) {
  _inherits(GlobalNavigationItemPrimitive, _Component);

  function GlobalNavigationItemPrimitive() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GlobalNavigationItemPrimitive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GlobalNavigationItemPrimitive)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderIconAndBadge = function (badgeWrapper) {
      var _this$props = _this.props,
          Icon = _this$props.icon,
          Badge = _this$props.badge,
          label = _this$props.label,
          tooltip = _this$props.tooltip;

      var presentationProps = _this.getPresentationProps();

      if (!Icon && !Badge) return null;
      return React.createElement(Fragment, null, !!Icon && React.createElement("div", {
        css: {
          pointerEvents: 'none'
        }
      }, React.createElement(Icon, {
        label: label || tooltip,
        secondaryColor: "inherit"
      })), !!Badge && React.createElement("div", {
        css: badgeWrapper
      }, React.createElement(Badge, presentationProps)));
    };

    _this.getGlobalItemExternalProps = function () {
      var _this$props2 = _this.props,
          createAnalyticsEvent = _this$props2.createAnalyticsEvent,
          isActive = _this$props2.isActive,
          isHover = _this$props2.isHover,
          isSelected = _this$props2.isSelected,
          theme = _this$props2.theme,
          externalProps = _objectWithoutProperties(_this$props2, ["createAnalyticsEvent", "isActive", "isHover", "isSelected", "theme"]);

      return externalProps;
    };

    _this.getPresentationProps = function () {
      var _this$props3 = _this.props,
          isActive = _this$props3.isActive,
          isHover = _this$props3.isHover,
          isSelected = _this$props3.isSelected,
          size = _this$props3.size;
      return {
        isActive: isActive,
        isHover: isHover,
        isSelected: isSelected,
        size: size
      };
    };

    _this.generateStyles = function () {
      var _this$props4 = _this.props,
          isActive = _this$props4.isActive,
          isHover = _this$props4.isHover,
          isSelected = _this$props4.isSelected,
          size = _this$props4.size,
          styleReducer = _this$props4.styles,
          theme = _this$props4.theme;
      var mode = theme.mode;
      var presentationProps = {
        isActive: isActive,
        isHover: isHover,
        isSelected: isSelected,
        size: size
      };
      var defaultStyles = mode.globalItem(presentationProps);
      return styleReducer(defaultStyles, presentationProps);
    };

    _this.renderChildren = function (styles) {
      var _this$props5 = _this.props,
          href = _this$props5.href,
          onClick = _this$props5.onClick,
          target = _this$props5.target,
          CustomComponent = _this$props5.component;
      var itemBase;

      if (CustomComponent) {
        itemBase = React.createElement(CustomComponent, _extends({}, _this.getGlobalItemExternalProps(), {
          className: css({
            '&&': styles.itemBase
          })
        }), _this.renderIconAndBadge(styles.badgeWrapper));
      } else if (href) {
        itemBase = React.createElement("a", {
          href: href,
          onClick: onClick,
          target: target,
          className: css({
            '&&': styles.itemBase
          })
        }, _this.renderIconAndBadge(styles.badgeWrapper));
      } else if (onClick) {
        itemBase = React.createElement("button", {
          onClick: onClick,
          className: css({
            '&&': styles.itemBase
          })
        }, _this.renderIconAndBadge(styles.badgeWrapper));
      } else {
        itemBase = React.createElement("span", {
          className: css({
            '&&': styles.itemBase
          })
        }, _this.renderIconAndBadge(styles.badgeWrapper));
      }

      return itemBase;
    };

    return _this;
  }

  _createClass(GlobalNavigationItemPrimitive, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          isSelected = _this$props6.isSelected,
          tooltip = _this$props6.tooltip;
      var styles = this.generateStyles();
      return React.createElement(Tooltip, {
        delay: 0,
        content: isSelected ? undefined : tooltip,
        position: "right",
        hideTooltipOnClick: true,
        hideTooltipOnMouseDown: true
      }, React.createElement("div", {
        className: css({
          display: 'inline-block'
        })
      }, this.renderChildren(styles)));
    }
  }]);

  return GlobalNavigationItemPrimitive;
}(Component);

GlobalNavigationItemPrimitive.defaultProps = {
  isActive: false,
  isHover: false,
  isSelected: false,
  size: 'large',
  styles: styleReducerNoOp
};
export { GlobalNavigationItemPrimitive as BaseGlobalNavigationItemPrimitive };
export default withGlobalTheme(GlobalNavigationItemPrimitive);