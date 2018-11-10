// @flow
import React from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';
import { colors, gridSize, themed } from '@atlaskit/theme';

import '!style-loader!css-loader!prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import { replaceSrc } from '@atlaskit/docs';
import { replaceImports } from 'codesandboxer';

const Code = styled.pre`
  border-radius: 3px;
  background-color: ${themed({ light: colors.N800, dark: colors.N800 })};
  color: ${themed({ light: colors.N60, dark: colors.N60 })};
  display: block;
  margin: 0 0 ${gridSize}px;
  overflow-x: auto;
  padding: ${gridSize}px;

  & code {
    font-family: Monaco, Menlo, monospace;
    font-size: 0.9em;
  }
`;

type Props = {
  content: string,
  grammar: 'jsx',
  name: string,
};

export default function CodeBlock(props: Props) {
  const syntax = Prism.languages[props.grammar];
  const srcFixed = replaceSrc(props.content, props.name);
  const importFixed = replaceImports(srcFixed, [
    ['../glyph/*', `${props.name}/glyph/`],
  ]);
  const highlighted = Prism.highlight(importFixed, syntax);

  return (
    <Code>
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </Code>
  );
}
