import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field Counter
  <p class="lead">Counter field for increasing and decreasing numbers</p>

  ${code`import FieldCounter from '@uidu/field-counter';`}

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
      heading="Step Props"
      props={require('!!extract-react-types-loader!../src/components/FieldCounter')}
    />
  )}
  `;
