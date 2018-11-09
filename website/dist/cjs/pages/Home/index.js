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

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var _Cards = _interopRequireDefault(require("./Cards"));

var _config = require("./config");

require("../../assets/css/charlie-display-font.less");

// // 
var fonts = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

var Title = _styledComponents.default.h1.withConfig({
  displayName: "Home__Title",
  componentId: "sc-1ql3lw6-0"
})(["\n  color: ", ";\n  font-family: 'Charlie_Display_Semibold', ", "; /* stylelint-disable-line */\n  font-size: 52px;\n  margin: 80px 0 0 !important;\n  letter-spacing: 0;\n"], _theme.colors.N0, fonts);

var Intro = _styledComponents.default.div.withConfig({
  displayName: "Home__Intro",
  componentId: "sc-1ql3lw6-1"
})(["\n  color: ", ";\n  display: inline-block;\n  font-size: 24px;\n  font-family: 'Charlie_Display_Regular', ", "; /* stylelint-disable-line */\n  font-weight: 300;\n  margin-bottom: 80px;\n  margin-top: 24px;\n  max-width: 640px;\n  letter-spacing: 0;\n\n  a {\n    color: ", ";\n\n    &:hover {\n      color: ", ";\n    }\n  }\n"], _theme.colors.N0, fonts, _theme.colors.B75, _theme.colors.N0);

var HomePageWrapper = _styledComponents.default.div.withConfig({
  displayName: "Home__HomePageWrapper",
  componentId: "sc-1ql3lw6-2"
})(["\n  margin: 0 auto;\n  text-align: center;\n  color: ", ";\n  margin-top: ", "px;\n\n  @media (min-width: ", "px) {\n    margin-top: ", "px;\n  }\n\n  @media (min-width: 800px) {\n    margin-right: 64px;\n  }\n"], _theme.colors.N0, _theme.math.add(_theme.gridSize, 3), _config.TABLET_BREAKPOINT_MIN, _theme.math.add(_theme.gridSize, 10));

var Style = function Style() {
  return _react.default.createElement("style", null, "\n  body {\n    background-color: ".concat(_theme.colors.B500, ";\n  }\n"));
};

var HomePage =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HomePage, _Component);

  function HomePage() {
    (0, _classCallCheck2.default)(this, HomePage);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HomePage).apply(this, arguments));
  }

  (0, _createClass2.default)(HomePage, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(HomePageWrapper, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null)), _react.default.createElement(Style, null), _react.default.createElement(Title, null, "Atlaskit"), _react.default.createElement(Intro, null, "Atlassian's official UI library, built according to the Atlassian\xA0Design\xA0Guidelines."), _react.default.createElement(_Cards.default, null));
    }
  }]);
  return HomePage;
}(_react.Component);

exports.default = HomePage;
module.exports = exports.default;