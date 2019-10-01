import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
A Markdown to ProseMirror Node parser.

## Usage

Use the component in your React app as follows:

  ${code`import { MarkdownTransformer } from '@uidu/editor-markdown-transformer';
  const transformer = new MarkdownTransformer(schema);
  transfomer.parse(markdown);`}

  ${(
    <Example
      packageName="@uidu/editor-markdown-transformer"
      Component={require('../examples/0-markdown-transformer').default}
      title="Markdown Transformer"
      source={require('!!raw-loader!../examples/0-markdown-transformer')}
    />
  )}
`;
