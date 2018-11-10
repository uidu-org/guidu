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

var _arrowLeftCircle = _interopRequireDefault(require("@atlaskit/icon/glyph/arrow-left-circle"));

var _theme = require("@atlaskit/theme");

var _ConnectedItem = _interopRequireDefault(require("../ConnectedItem"));

var gridSize = (0, _theme.gridSize)();

var ArrowLeft = function ArrowLeft() {
  return _react.default.createElement(_arrowLeftCircle.default, {
    primaryColor: "currentColor",
    secondaryColor: "inherit"
  });
};

var BackItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BackItem, _Component);

  function BackItem() {
    (0, _classCallCheck2.default)(this, BackItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BackItem).apply(this, arguments));
  }

  (0, _createClass2.default)(BackItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          beforeProp = _this$props.before,
          text = _this$props.text,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["before", "text"]);
      var before = beforeProp;

      if (!before) {
        before = ArrowLeft;
      }

      return _react.default.createElement("div", {
        css: {
          paddingBottom: gridSize * 2
        }
      }, _react.default.createElement(_ConnectedItem.default, (0, _extends2.default)({}, props, {
        after: null,
        before: before,
        text: text
      })));
    }
  }]);
  return BackItem;
}(_react.Component);

exports.default = BackItem;
BackItem.defaultProps = {
  text: 'Back'
};
module.exports = exports.default;