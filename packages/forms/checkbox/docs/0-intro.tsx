import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### Checkbox
  <p class="lead">A checkbox element primarily for use in forms.</p>

  The Checkbox export provides for controlled & uncontrolled usage and includes the label, input & icon.

  ${code`import Checkbox, { CheckboxGroup } from '@uidu/checkbox';`}

  ${(
    <Example
      packageName="@uidu/checkbox"
      Component={require('../examples/00-basic-usage').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-usage').default}
    />
  )}

${(
  <Example
    packageName="@uidu/checkbox"
    Component={require('../examples/01-indeterminate').default}
    title="Indeterminate"
    source={require('!!raw-loader!../examples/01-indeterminate').default}
  />
)}

${(
  <Example
    packageName="@uidu/checkbox"
    Component={require('../examples/04-checkbox-form').default}
    title="With a Form"
    source={require('!!raw-loader!../examples/04-checkbox-form').default}
  />
)}

#### Checkbox Props
${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/Checkbox')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/CheckboxGroup')}
  />
)}
`;
