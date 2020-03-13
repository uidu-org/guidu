import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Field Text
  <p class="lead">Classic input type text with superpowers</p>

  Text Field exports both a stateful default component, and a stateless component.
  The stateful component manages the value of the input for you and passes all
   other props on to the stateless version.

  ${code`import FieldText, { FieldTextStateless } from '@uidu/field-text';`}


  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/Scaffold').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Scaffold').default}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldText')}
      heading="FieldText Props"
    />
  )}
`;
