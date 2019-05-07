import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-room-group component to make it easy to display
  multiple chat-room together.

  ## Usage

  ${code`import ChatWindow from '@uidu/chat-room';`}

  ${(
    <Example
      packageName="@uidu/chat-room"
      Component={require('../examples/Basic').default}
      title="Your Appearance Options"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/ChatRoom')}
    />
  )}
`;
