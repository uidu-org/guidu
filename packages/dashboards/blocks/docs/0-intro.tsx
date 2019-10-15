import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import Stepper, { Step } from '@uidu/stepper';`}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  You can pass \`data\` attribute to use same components without built-in manipulators. Each block has different data requirements.

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/SingleBlocks').default}
      title="Single Blocks"
      source={require('!!raw-loader!../examples/SingleBlocks')}
    />
  )}

  ${(
    <Props
      heading="Blocks"
      props={require('!!extract-react-types-loader!../src/components/Blocks')}
    />
  )}
`;
