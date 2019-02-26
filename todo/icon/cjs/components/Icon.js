"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = exports.default = exports.IconWrapper = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _uuid = _interopRequireDefault(require("uuid"));

var _theme = require("@atlaskit/theme");

var _constants = require("../constants");

var getSize = function getSize(props) {
  if (props.size) {
    return "height: ".concat(_constants.sizes[props.size], "; width: ").concat(_constants.sizes[props.size], ";");
  }

  return null;
};

var IconWrapper = _styledComponents.default.span.withConfig({
  displayName: "Icon__IconWrapper",
  componentId: "dyhwwi-0"
})(["\n  ", " color: ", ";\n  display: inline-block;\n  fill: ", ";\n  flex-shrink: 0;\n  line-height: 1;\n\n  > svg {\n    ", " max-height: 100%;\n    max-width: 100%;\n    overflow: hidden;\n    pointer-events: none;\n    vertical-align: bottom;\n  }\n  /* Stop-color doesn't properly apply in chrome when the inherited/current color changes.\n   * We have to initially set stop-color to inherit (either via DOM attribute or an initial CSS\n   * rule) and then override it with currentColor for the color changes to be picked up.\n   */\n  stop {\n    stop-color: currentColor;\n  }\n"], getSize, function (p) {
  return p.primaryColor || 'currentColor';
}, function (p) {
  return p.secondaryColor || _theme.colors.background;
}, getSize);

exports.IconWrapper = IconWrapper;

var Icon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Icon, _Component);

  function Icon() {
    (0, _classCallCheck2.default)(this, Icon);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
  }

  (0, _createClass2.default)(Icon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Glyph = _this$props.glyph,
          dangerouslySetGlyph = _this$props.dangerouslySetGlyph,
          primaryColor = _this$props.primaryColor,
          secondaryColor = _this$props.secondaryColor,
          size = _this$props.size; // handling the glyphs as strings

      if (dangerouslySetGlyph) {
        return _react.default.createElement(IconWrapper, {
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          size: size,
          "aria-label": this.props.label,
          dangerouslySetInnerHTML: {
            __html: Icon.insertDynamicGradientID(dangerouslySetGlyph)
          }
        });
      } // handling the glyphs when passed through as functions


      return _react.default.createElement(IconWrapper, {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        size: size,
        "aria-label": this.props.label
      }, Glyph ? _react.default.createElement(Glyph, {
        role: "presentation"
      }) : null);
    }
  }], [{
    key: "insertDynamicGradientID",

    /* Icons need unique gradient IDs across instances for different gradient definitions to work
     * correctly.
     * A step in the icon build process replaces linear gradient IDs and their references in paths
     * to a placeholder string so we can replace them with a dynamic ID here.
     * Replacing the original IDs with placeholders in the build process is more robust than not
     * using placeholders as we do not have to rely on regular expressions to find specific element
     * to replace.
     */
    value: function insertDynamicGradientID(svgStr) {
      var id = (0, _uuid.default)();
      var replacedSvgStr = svgStr.replace(/id="([^"]+)-idPlaceholder"/g, "id=$1-".concat(id)).replace(/fill="url\(#([^"]+)-idPlaceholder\)"/g, "fill=\"url(#$1-".concat(id, ")\""));
      return replacedSvgStr;
    }
  }]);
  return Icon;
}(_react.Component);

exports.default = Icon;
var size = Object.keys(_constants.sizes).reduce(function (p, c) {
  return Object.assign(p, (0, _defineProperty2.default)({}, c, c));
}, {});
exports.size = size;