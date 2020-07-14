import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

  Renders inline code snippets and code blocks.

  ## Usage

  ${code`import { AkCode, AkCodeBlock } from '@uidu/code`}

  ${(
    <Example
      packageName="@uidu/code"
      Component={require('../examples/00-inline-code-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-inline-code-basic').default}
    />
  )}

  ${(
    <Props
      heading="Code Props"
      props={require('!!extract-react-types-loader!../src/components/Code')}
    />
  )}

  ${(
    <Props
      heading="CodeBlock Props"
      props={require('!!extract-react-types-loader!../src/components/CodeBlock')}
    />
  )}

`;
