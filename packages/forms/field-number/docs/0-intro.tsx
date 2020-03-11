import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Field Number
  <p class="lead">Numeric field (non countable)</p>

  Text Field exports both a stateful default component, and a stateless component.
  The stateful component manages the value of the input for you and passes all
   other props on to the stateless version.

  ${code`import FieldNumber, { FieldNumberStateless } from '@uidu/field-text';`}

  ${(
    <Example
      packageName="@uidu/field-number"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-number"
      Component={require('../examples/Scaffold').default}
      title="Scaffold"
      source={require('!!raw-loader!../examples/Scaffold').default}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldNumber')}
      heading="FieldNumber Props"
    />
  )}
`;
