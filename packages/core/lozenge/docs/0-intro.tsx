import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Use lozenges to highlight an item's status for quick recognition. Use
  subtle lozenges by default and in instances where they may dominate the
  screen, such as in long tables.

  ## Usage

  ${code`import Lozenge from '@uidu/lozenge';`}

  ${(
    <Example
      packageName="@uidu/lozenge"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${<Props props={require('!!extract-react-types-loader!../src/Lozenge')} />}
`;
