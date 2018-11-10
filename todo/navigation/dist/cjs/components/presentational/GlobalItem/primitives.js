"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseGlobalNavigationItemPrimitive = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _emotion = require("emotion");

var _tooltip = _interopRequireDefault(require("@atlaskit/tooltip"));

var _theme = require("../../../theme");

var GlobalNavigationItemPrimitive =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GlobalNavigationItemPrimitive, _Component);

  function GlobalNavigationItemPrimitive() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GlobalNavigationItemPrimitive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GlobalNavigationItemPrimitive)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderIconAndBadge = function (badgeWrapper) {
      var _this$props = _this.props,
          Icon = _this$props.icon,
          Badge = _this$props.badge,
          label = _this$props.label,
          tooltip = _this$props.tooltip;

      var presentationProps = _this.getPresentationProps();

      if (!Icon && !Badge) return null;
      return _react.default.createElement(_react.Fragment, null, !!Icon && _react.default.createElement("div", {
        css: {
          pointerEvents: 'none'
        }
      }, _react.default.createElement(Icon, {
        label: label || tooltip,
        secondaryColor: "inherit"
      })), !!Badge && _react.default.createElement("div", {
        css: badgeWrapper
      }, _react.default.createElement(Badge, presentationProps)));
    };

    _this.getGlobalItemExternalProps = function () {
      var _this$props2 = _this.props,
          createAnalyticsEvent = _this$props2.createAnalyticsEvent,
          isActive = _this$props2.isActive,
          isHover = _this$props2.isHover,
          isSelected = _this$props2.isSelected,
          theme = _this$props2.theme,
          externalProps = (0, _objectWithoutProperties2.default)(_this$props2, ["createAnalyticsEvent", "isActive", "isHover", "isSelected", "theme"]);
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
        itemBase = _react.default.createElement(CustomComponent, (0, _extends2.default)({}, _this.getGlobalItemExternalProps(), {
          className: (0, _emotion.css)({
            '&&': styles.itemBase
          })
        }), _this.renderIconAndBadge(styles.badgeWrapper));
      } else if (href) {
        itemBase = _react.default.createElement("a", {
          href: href,
          onClick: onClick,
          target: target,
          className: (0, _emotion.css)({
            '&&': styles.itemBase
          })
        }, _this.renderIconAndBadge(styles.badgeWrapper));
      } else if (onClick) {
        itemBase = _react.default.createElement("button", {
          onClick: onClick,
          className: (0, _emotion.css)({
            '&&': styles.itemBase
          })
        }, _this.renderIconAndBadge(styles.badgeWrapper));
      } else {
        itemBase = _react.default.createElement("span", {
          className: (0, _emotion.css)({
            '&&': styles.itemBase
          })
        }, _this.renderIconAndBadge(styles.badgeWrapper));
      }

      return itemBase;
    };

    return _this;
  }

  (0, _createClass2.default)(GlobalNavigationItemPrimitive, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          isSelected = _this$props6.isSelected,
          tooltip = _this$props6.tooltip;
      var styles = this.generateStyles();
      return _react.default.createElement(_tooltip.default, {
        delay: 0,
        content: isSelected ? undefined : tooltip,
        position: "right",
        hideTooltipOnClick: true,
        hideTooltipOnMouseDown: true
      }, _react.default.createElement("div", {
        className: (0, _emotion.css)({
          display: 'inline-block'
        })
      }, this.renderChildren(styles)));
    }
  }]);
  return GlobalNavigationItemPrimitive;
}(_react.Component);

exports.BaseGlobalNavigationItemPrimitive = GlobalNavigationItemPrimitive;
GlobalNavigationItemPrimitive.defaultProps = {
  isActive: false,
  isHover: false,
  isSelected: false,
  size: 'large',
  styles: _theme.styleReducerNoOp
};

var _default = (0, _theme.withGlobalTheme)(GlobalNavigationItemPrimitive);

exports.default = _default;