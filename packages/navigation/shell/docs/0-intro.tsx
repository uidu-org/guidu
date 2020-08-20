import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import Shell, {
  ScrollableContainer,
  ShellSidebar,
  ShellHeader,
  ShellMain,
  ShellBody,
  ShellFooter,
} from '@uidu/shell';`}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/Dashboard').default}
      title="Dashboard"
      source={require('!!raw-loader!../examples/Dashboard').default}
      fullWidth
      overflowHidden
    />
  )}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/App').default}
      title="App"
      source={require('!!raw-loader!../examples/App').default}
      fullWidth
      overflowHidden
    />
  )}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/Event').default}
      title="Event"
      source={require('!!raw-loader!../examples/Event').default}
      fullWidth
      overflowHidden
    />
  )}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/Discover').default}
      title="Discover"
      source={require('!!raw-loader!../examples/Discover').default}
      fullWidth
      overflowHidden
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/Shell')}
    />
  )}
`;
