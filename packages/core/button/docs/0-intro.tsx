import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a button-group component to make it easy to display
  multiple buttons together.

  ${code`import Button, { ButtonGroup } from '@uidu/button';`}

  ${(
    <Example
      packageName="@uidu/button"
      Component={require('../examples/10-Button').default}
      title="Basic Button"
      source={require('!!raw-loader!../examples/10-Button').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/button"
      Component={require('../examples/30-Appearances').default}
      title="Your Appearance Options"
      source={require('!!raw-loader!../examples/30-Appearances').default}
    />
  )}

  #### You can also use button groups:

  ${(
    <Example
      packageName="@uidu/button"
      Component={require('../examples/20-ButtonGroup').default}
      title="Simple Button Group"
      source={require('!!raw-loader!../examples/20-ButtonGroup').default}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/ButtonProps/ButtonProps')}
    />
  )}

  ${(
    <Props
      heading="Button Group Props"
      props={require('!!extract-react-types-loader!../src/components/ButtonGroup')}
    />
  )}
`;
