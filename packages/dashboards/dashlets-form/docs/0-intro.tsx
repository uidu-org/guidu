import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Dashlets Form
  <p class="lead">Forms for creating and editing a Dashlet</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.
  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import DashletsForm from '@uidu/dashlets-form';`}

  ${(
    <Example
      packageName="@uidu/dashlets-form"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

`;
