"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HrText;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border: 0;\n  color: black;\n  height: 1.5em;\n  line-height: 1em;\n  opacity: 0.5;\n  outline: 0;\n  position: relative;\n  text-align: center;\n\n  &::before {\n    background: linear-gradient(to right, transparent, #818078, transparent);\n    content: '';\n    // use the linear-gradient for the fading effect\n    // use a solid background color for a solid bar\n    height: 1px;\n    left: 0;\n    position: absolute;\n    top: 50%;\n    width: 100%;\n  }\n\n  &::after {\n    // this is really the only tricky part, you need to specify the background color of the container element...\n    background-color: #fcfcfa;\n    color: #818078;\n    content: attr(data-content);\n    display: inline-block;\n    line-height: 1.5em;\n    padding: 0 0.5em;\n    position: relative;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Hr = _styledComponents.default.hr(_templateObject());

function HrText(_ref) {
  var text = _ref.text;
  return _react.default.createElement(Hr, {
    "data-content": text
  });
}

HrText.propTypes = {
  text: _propTypes.default.string.isRequired
};
module.exports = exports.default;