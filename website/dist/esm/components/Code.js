import React from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';
import { colors, gridSize, themed } from '@atlaskit/theme'; // import '!style-loader!css-loader!prismjs/themes/prism-tomorrow.css';

import 'prismjs/components/prism-jsx';
import { replaceSrc } from '@atlaskit/docs';
import { replaceImports } from 'codesandboxer';
var Code = styled.pre.withConfig({
  displayName: "Code",
  componentId: "sc-7aisra-0"
})(["\n  border-radius: 3px;\n  background-color: ", ";\n  color: ", ";\n  display: block;\n  margin: 0 0 ", "px;\n  overflow-x: auto;\n  padding: ", "px;\n\n  & code {\n    font-family: Monaco, Menlo, monospace;\n    font-size: 0.9em;\n  }\n"], themed({
  light: colors.N800,
  dark: colors.N800
}), themed({
  light: colors.N60,
  dark: colors.N60
}), gridSize, gridSize);
export default function CodeBlock(props) {
  var syntax = Prism.languages[props.grammar];
  var srcFixed = replaceSrc(props.content, props.name);
  var importFixed = replaceImports(srcFixed, [['../glyph/*', "".concat(props.name, "/glyph/")]]);
  var highlighted = Prism.highlight(importFixed, syntax);
  return React.createElement(Code, null, React.createElement("code", {
    dangerouslySetInnerHTML: {
      __html: highlighted
    }
  }));
}