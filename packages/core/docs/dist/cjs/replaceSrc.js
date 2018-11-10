"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceSrc;

var _codesandboxer = require("codesandboxer");

var regexString = /((?:import|export)\s*['"\`])(..\/src\/index.less)(['"\`]\s*)/;

function replaceSrc(content, name) {
  var replacedCode = content;

  if (name === '@atlaskit/css-reset') {
    replacedCode = replacedCode.replace(regexString, "$1".concat(name, "$3"));
  }

  if (name) {
    replacedCode = (0, _codesandboxer.replaceImports)(replacedCode, [['../src', name]]);
  }

  return replacedCode;
}

module.exports = exports.default;