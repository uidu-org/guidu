"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("@atlaskit/theme");

var _avatar = _interopRequireDefault(require("@atlaskit/avatar"));

var _select = require("@atlaskit/select");

var gridSize = (0, _theme.gridSize)();

var ContentWrapper = function ContentWrapper(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflowX: 'hidden'
    }
  }, props));
};

var TextWrapper = function TextWrapper(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      lineHeight: 16 / (0, _theme.fontSize)()
    }
  }, props));
};

var SubTextWrapper = function SubTextWrapper(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    css: {
      color: _theme.colors.N200,
      flex: '1 1 auto',
      fontSize: 12,
      lineHeight: 14 / 12,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, props));
};

var ElementWrapper = function ElementWrapper(_ref) {
  var is = _ref.is,
      props = (0, _objectWithoutProperties2.default)(_ref, ["is"]);
  var direction = {
    before: 'marginRight',
    after: 'marginLeft'
  };
  var margin = direction[is];
  return _react.default.createElement("div", (0, _extends2.default)({
    css: (0, _defineProperty2.default)({
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0
    }, margin, gridSize)
  }, props));
};

var Option =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Option, _PureComponent);

  function Option() {
    (0, _classCallCheck2.default)(this, Option);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Option).apply(this, arguments));
  }

  (0, _createClass2.default)(Option, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          innerProps = _this$props.innerProps,
          innerRef = _this$props.innerRef,
          _this$props$data = _this$props.data,
          avatar = _this$props$data.avatar,
          subText = _this$props$data.subText,
          text = _this$props$data.text;
      return _react.default.createElement("div", (0, _extends2.default)({
        ref: innerRef
      }, innerProps), _react.default.createElement(_select.components.Option, this.props, !!avatar && _react.default.createElement(ElementWrapper, {
        is: "before"
      }, _react.default.createElement(_avatar.default, {
        borderColor: "transparent",
        src: avatar,
        appearance: "square"
      })), _react.default.createElement(ContentWrapper, null, _react.default.createElement(TextWrapper, null, text), !!subText && _react.default.createElement(SubTextWrapper, null, subText))));
    }
  }]);
  return Option;
}(_react.PureComponent);

exports.default = Option;
module.exports = exports.default;