import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Field Password
  <p class="lead">Field to insert a password and check its strength</p>

  Text Field exports both a stateful default component, and a stateless component.
  The stateful component manages the value of the input for you and passes all
   other props on to the stateless version.

  ${code`import FieldPassword, { FieldPasswordStateless } from '@uidu/field-password';`}

  ${(
    <Example
      packageName="@uidu/field-password"
      Component={require('../examples/Scaffold').default}
      title="Stateless Example"
      source={require('!!raw-loader!../examples/Scaffold').default}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldPassword')}
      heading="FieldPassword Props"
    />
  )}

`;
