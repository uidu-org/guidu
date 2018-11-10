import { replaceImports } from 'codesandboxer';
var regexString = /((?:import|export)\s*['"\`])(..\/src\/index.less)(['"\`]\s*)/;
export default function replaceSrc(content, name) {
  var replacedCode = content;

  if (name === '@atlaskit/css-reset') {
    replacedCode = replacedCode.replace(regexString, "$1".concat(name, "$3"));
  }

  if (name) {
    replacedCode = replaceImports(replacedCode, [['../src', name]]);
  }

  return replacedCode;
}