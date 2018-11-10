"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ItemPrimitiveBase = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _emotion = require("emotion");

var _theme = require("../../../theme");

var isString = function isString(x) {
  return typeof x === 'string';
};

var ComponentSwitch = function ComponentSwitch(_ref) {
  var as = _ref.as,
      draggableProps = _ref.draggableProps,
      innerRef = _ref.innerRef,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["as", "draggableProps", "innerRef"]);
  var isElement = isString(as);
  var props = isElement ? rest : (0, _objectSpread2.default)({
    innerRef: innerRef,
    draggableProps: draggableProps
  }, rest); // only pass the actual `ref` to an element, it's the responsibility of the
  // component author to use `innerRef` where applicable

  var ref = isElement ? innerRef : null;
  var ElementOrComponent = as;
  return _react.default.createElement(ElementOrComponent, (0, _extends2.default)({
    ref: ref
  }, draggableProps, props));
};

var getItemComponentProps = function getItemComponentProps(props) {
  var createAnalyticsEvent = props.createAnalyticsEvent,
      isActive = props.isActive,
      isHover = props.isHover,
      isSelected = props.isSelected,
      isFocused = props.isFocused,
      isDragging = props.isDragging,
      theme = props.theme,
      componentProps = (0, _objectWithoutProperties2.default)(props, ["createAnalyticsEvent", "isActive", "isHover", "isSelected", "isFocused", "isDragging", "theme"]);
  return componentProps;
};

var ItemPrimitive =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ItemPrimitive, _PureComponent);

  function ItemPrimitive() {
    (0, _classCallCheck2.default)(this, ItemPrimitive);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ItemPrimitive).apply(this, arguments));
  }

  (0, _createClass2.default)(ItemPrimitive, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          After = _this$props.after,
          Before = _this$props.before,
          CustomComponent = _this$props.component,
          draggableProps = _this$props.draggableProps,
          href = _this$props.href,
          innerRef = _this$props.innerRef,
          isActive = _this$props.isActive,
          isDragging = _this$props.isDragging,
          isHover = _this$props.isHover,
          isSelected = _this$props.isSelected,
          onClick = _this$props.onClick,
          isFocused = _this$props.isFocused,
          spacing = _this$props.spacing,
          styleReducer = _this$props.styles,
          subText = _this$props.subText,
          target = _this$props.target,
          text = _this$props.text,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var presentationProps = {
        isActive: isActive,
        isDragging: isDragging,
        isHover: isHover,
        isSelected: isSelected,
        isFocused: isFocused,
        spacing: spacing
      };
      var defaultStyles = mode.item(presentationProps)[context];
      var styles = styleReducer(defaultStyles, presentationProps, theme); // base element switch

      var itemComponent = 'div';
      var itemProps = {
        draggableProps: draggableProps,
        innerRef: innerRef
      };

      if (CustomComponent) {
        itemComponent = CustomComponent;
        itemProps = getItemComponentProps(this.props);
      } else if (href) {
        itemComponent = 'a';
        itemProps = {
          href: href,
          onClick: onClick,
          target: target,
          draggableProps: draggableProps,
          innerRef: innerRef
        };
      } else if (onClick) {
        itemComponent = 'button';
        itemProps = {
          onClick: onClick,
          draggableProps: draggableProps,
          innerRef: innerRef
        };
      }

      return _react.default.createElement(ComponentSwitch, (0, _extends2.default)({
        as: itemComponent,
        className: (0, _emotion.css)({
          '&&': styles.itemBase
        })
      }, itemProps), !!Before && _react.default.createElement("div", {
        css: styles.beforeWrapper
      }, _react.default.createElement(Before, presentationProps)), _react.default.createElement("div", {
        css: styles.contentWrapper
      }, _react.default.createElement("div", {
        css: styles.textWrapper
      }, text), !!subText && _react.default.createElement("div", {
        css: styles.subTextWrapper
      }, subText)), !!After && _react.default.createElement("div", {
        css: styles.afterWrapper
      }, _react.default.createElement(After, presentationProps)));
    }
  }]);
  return ItemPrimitive;
}(_react.PureComponent);

exports.ItemPrimitiveBase = ItemPrimitive;
ItemPrimitive.defaultProps = {
  isActive: false,
  isDragging: false,
  isHover: false,
  isSelected: false,
  isFocused: false,
  spacing: 'default',
  styles: _theme.styleReducerNoOp,
  text: ''
};

var _default = (0, _theme.withContentTheme)(ItemPrimitive);

exports.default = _default;