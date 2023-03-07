import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import LinkPreview from '@uidu/link-preview';`}

  ${(
    <Example
      packageName="@uidu/link-preview"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/link-preview"
      Component={require('../examples/Existing').default}
      title="Existing"
      source={require('!!raw-loader!../examples/Existing').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/link-preview"
      Component={require('../examples/OnKeyDown').default}
      title="OnKeyDown"
      source={require('!!raw-loader!../examples/OnKeyDown').default}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/index')}
    />
  )}
`;
