import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Form
  <p class="lead">Formsy React enhanced Form component</p>

  A Toggle component. It is a checkbox displayed in an alternative way.
  The default export is a component that you can control and listen to events.

  ${code`import Form from '@uidu/form';`}

  ${(
    <Example
      packageName="@uidu/form"
      Component={require('../examples/App').default}
      title="Basic"
      source={require('!!raw-loader!../examples/App').default}
    />
  )}

  ${(
    <Props
      heading="Toggle Default Props"
      props={require('!!extract-react-types-loader!../src/components/Form')}
    />
  )}
`;
