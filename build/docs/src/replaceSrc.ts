/* eslint-disable no-useless-escape */
import { replaceImports } from 'codesandboxer';

const cssResetRegexString = /((?:import|export)\s*['"\`])(..\/src\/index.less)(['"\`]\s*)/;
const srcEntryPointRegexString = /((?:import|export)[^'"\`]*['"\`])(..\/src\/)([^/]*['"\`]\s*)/;

export default function replaceSrc(content /*: string*/, name /*: string*/) {
  let replacedCode = content;
  if (name) {
    // Replace ../src/<entry-point> with ${name}/<entry-point>
    replacedCode = replacedCode.replace(
      srcEntryPointRegexString,
      `$1${name}/$3`,
    );

    replacedCode = replaceImports(replacedCode, [['../src', name]]);
  }
  return replacedCode;
}
