import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Chat Window
  <p class="lead">Chat window component with Messages, Form and header</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import ChatWindow from '@uidu/chat-window';`}

  ${(
    <Example
      packageName="@uidu/chat-window"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/ChatWindow')}
    />
  )}
`;
