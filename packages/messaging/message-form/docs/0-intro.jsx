import * as React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a message-form-group component to make it easy to display
  multiple message-forms together.

  ## Usage

  ${code`import MessageForm from '@uidu/message-form';`}

  ${(
    <Example
      packageName="@uidu/message-form"
      Component={require('../examples/Basic').default}
      title="Your Appearance Options"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/MessageForm')}
    />
  )}
`;
