import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field
  <p class="lead">Field component includes all guidu fields, shows a loader before importing them.</p>

  ${code`import Field from '@uidu/field';`}

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
      props={require('!!extract-react-types-loader!../src/components/Field')}
    />
  )}
  `;
