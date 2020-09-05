import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field Textarea
  <p class="lead">Simple textarea replacement</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import FieldTextarea from '@uidu/field-textarea';`}

  ${(
    <Example
      packageName="@uidu/field-textarea"
      Component={require('../examples/Scaffold').default}
      title="BaScaffoldsic"
      source={require('!!raw-loader!../examples/Scaffold').default}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/FieldTextarea')}
    />
  )}
  `;
