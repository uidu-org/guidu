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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var MetaItem = function MetaItem(props) {
  return _react.default.createElement(DI, null, _react.default.createElement(DT, null, props.label), _react.default.createElement(DD, null, props.href ? _react.default.createElement("a", {
    href: props.href,
    target: "_new"
  }, props.summary) : props.summary));
};

var MetaData =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MetaData, _Component);

  function MetaData() {
    (0, _classCallCheck2.default)(this, MetaData);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MetaData).apply(this, arguments));
  }

  (0, _createClass2.default)(MetaData, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          packageSrc = _this$props.packageSrc,
          packageName = _this$props.packageName;
      return _react.default.createElement(Meta, null, _react.default.createElement(MetaItem, {
        label: "Install",
        summary: _react.default.createElement("code", null, "yarn add ", packageName)
      }), _react.default.createElement(MetaItem, {
        href: "https://www.npmjs.com/package/".concat(packageName),
        label: "npm",
        summary: packageName
      }), _react.default.createElement(MetaItem, {
        href: packageSrc,
        label: "Source",
        summary: "Github"
      }), _react.default.createElement(MetaItem, {
        href: "https://unpkg.com/".concat(packageName, "/dist/"),
        label: "Bundle",
        summary: "unpkg.com"
      }));
    }
  }]);
  return MetaData;
}(_react.Component);

exports.default = MetaData;

var Meta = _styledComponents.default.section.withConfig({
  displayName: "MetaData__Meta",
  componentId: "sc-5md7ea-0"
})(["\n  display: flex;\n  flex-wrap: wrap;\n  padding-bottom: ", "px;\n  padding-top: ", "px;\n\n  @media (min-width: 780px) {\n    padding-top: ", "px;\n  }\n"], _theme.math.multiply(_theme.gridSize, 3), _theme.math.multiply(_theme.gridSize, 1.5), _theme.math.multiply(_theme.gridSize, 3));

var DI = _styledComponents.default.div.withConfig({
  displayName: "MetaData__DI",
  componentId: "sc-5md7ea-1"
})(["\n  box-sizing: border-box;\n  display: flex;\n  flex-basis: 100%;\n  flex-direction: column;\n  padding: 0.4em 0;\n\n  @media (min-width: 780px) {\n    flex-direction: row;\n  }\n"]);

var DT = _styledComponents.default.div.withConfig({
  displayName: "MetaData__DT",
  componentId: "sc-5md7ea-2"
})(["\n  color: ", ";\n  flex-basis: 25%;\n"], _theme.colors.subtleText);

var DD = _styledComponents.default.div.withConfig({
  displayName: "MetaData__DD",
  componentId: "sc-5md7ea-3"
})(["\n  flex: 1 0 auto;\n"]);

module.exports = exports.default;