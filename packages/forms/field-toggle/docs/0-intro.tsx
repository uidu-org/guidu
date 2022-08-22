import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Field Toggle
  <p class="lead">A Toggle component</p>

  It is a checkbox displayed in an alternative way.
  The default export is a component that you can control and listen to events.

  ${code`import FieldToggle from '@uidu/field-toggle';`}

  ${(
    <Example
      packageName="@uidu/field-toggle"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="Toggle Default Props"
      props={require('!!extract-react-types-loader!../src/components/FieldToggle')}
    />
  )}
`;
