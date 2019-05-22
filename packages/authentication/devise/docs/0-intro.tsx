import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import Devise from '@uidu/devise';`}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/App').default}
      title="Dashboard"
      source={require('!!raw-loader!../examples/App').default}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/Devise')}
    />
  )}
`;
