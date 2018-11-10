"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _theme = require("@atlaskit/theme");

var _emotion = require("emotion");

var _Section = _interopRequireDefault(require("../Section"));

var gridSize = (0, _theme.gridSize)();

var MenuSection =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MenuSection, _Component);

  function MenuSection() {
    (0, _classCallCheck2.default)(this, MenuSection);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MenuSection).apply(this, arguments));
  }

  (0, _createClass2.default)(MenuSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alwaysShowScrollHint = _this$props.alwaysShowScrollHint,
          id = _this$props.id,
          children = _this$props.children,
          parentId = _this$props.parentId;
      return _react.default.createElement(_Section.default, {
        id: id,
        parentId: parentId,
        alwaysShowScrollHint: alwaysShowScrollHint,
        shouldGrow: true
      }, function (_ref) {
        var css = _ref.css;
        var menuCss = (0, _objectSpread2.default)({}, css, {
          paddingBottom: gridSize * 1.5
        });
        return children({
          css: menuCss,
          className: (0, _emotion.css)(menuCss)
        });
      });
    }
  }]);
  return MenuSection;
}(_react.Component);

exports.default = MenuSection;
MenuSection.defaultProps = {
  alwaysShowScrollHint: false
};
module.exports = exports.default;