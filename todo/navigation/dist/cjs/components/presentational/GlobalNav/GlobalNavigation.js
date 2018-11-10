"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _analyticsNamespacedContext = require("@atlaskit/analytics-namespaced-context");

var _primitives = require("./primitives");

/**
 * NOTE: 'GlobalNav' is the layout primitive, which will be wrapped by the more
 * opinionated 'GlobalNavigation' component.
 */
var GlobalNavigation =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GlobalNavigation, _Component);

  function GlobalNavigation() {
    (0, _classCallCheck2.default)(this, GlobalNavigation);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GlobalNavigation).apply(this, arguments));
  }

  (0, _createClass2.default)(GlobalNavigation, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          ItemComponent = _this$props.itemComponent,
          primaryItems = _this$props.primaryItems,
          secondaryItems = _this$props.secondaryItems,
          theme = _this$props.theme;
      var wrapperStyles = theme.mode.globalNav();
      return _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationLayer: 'global'
          },
          componentName: 'globalNav'
        }
      }, _react.default.createElement("div", {
        css: wrapperStyles
      }, _react.default.createElement(_primitives.PrimaryItemsList, null, _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationIconGrouping: 'primary'
          }
        }
      }, _react.default.createElement(_react.Fragment, null, primaryItems.map(function (props, index) {
        // Render the first item with a margin beneath it and a large icon
        if (!index) {
          var Icon = props.icon,
              rest = (0, _objectWithoutProperties2.default)(props, ["icon"]);
          return _react.default.createElement(_primitives.FirstPrimaryItemWrapper, {
            key: props.id || props.key || props.label
          }, _react.default.createElement(ItemComponent, (0, _extends2.default)({}, rest, {
            icon: function icon(provided) {
              return _react.default.createElement(Icon, (0, _extends2.default)({}, provided, {
                size: "large"
              }));
            },
            size: "large",
            index: index
          })));
        }

        return _react.default.createElement(ItemComponent, (0, _extends2.default)({}, props, {
          key: props.id || props.key || props.label,
          size: "large",
          index: index
        }));
      })))), _react.default.createElement(_primitives.SecondaryItemsList, null, _react.default.createElement(_analyticsNamespacedContext.NavigationAnalyticsContext, {
        data: {
          attributes: {
            navigationIconGrouping: 'secondary'
          }
        }
      }, _react.default.createElement(_react.Fragment, null, secondaryItems.map(function (props, index) {
        return _react.default.createElement(ItemComponent, (0, _extends2.default)({}, props, {
          key: props.id || props.label,
          size: "small",
          index: index
        }));
      }))))));
    }
  }]);
  return GlobalNavigation;
}(_react.Component);

exports.default = GlobalNavigation;
module.exports = exports.default;