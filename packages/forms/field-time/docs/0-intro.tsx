import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Field Time
  <p class="lead">Select time in a field</p>

  Text Field exports both a stateful default component, and a stateless component.
  The stateful component manages the value of the input for you and passes all
   other props on to the stateless version.

${code`import FieldTime, { FieldTimeStateless } from '@uidu/field-time';`}


  ${(
    <Example
      packageName="@uidu/field-time"
      Component={require('../examples/Scaffold').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Scaffold').default}
    />
  )}


  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldTime')}
      heading="FieldTime Props"
    />
  )}
`;
