import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Dashboard Controls
  <p class="lead">Controls to edit and customize dashboards</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.
  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import Stepper, { Step } from '@uidu/stepper';`}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Navigator').default}
      title="Navigator"
      source={require('!!raw-loader!../examples/Navigator').default}
    />
  )}
`;
