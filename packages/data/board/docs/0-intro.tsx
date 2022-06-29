import { Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/Board')}
    />
  )}
`;
