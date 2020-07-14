import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`

This transformer allows encoding ProseMirror Node in JSON format.

  ## Usage

  Use the encoder with editor-json-transformer as follows:

  ${code`import { JSONTransformer } from '@uidu/editor-json-transformer';
  const serializer = new JSONTransformer(schema);
  serializer.encode(editorContent);`}

  ${(
    <Example
      packageName="@uidu/editor-json-transformer"
      Component={require('../examples/0-json-transformer').default}
      title="Json Transformer"
      source={require('!!raw-loader!../examples/0-json-transformer').default}
    />
  )}
`;
