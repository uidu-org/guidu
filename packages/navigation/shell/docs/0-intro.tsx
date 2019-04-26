import * as React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import Shell, {
  ShellContent,
  ShellSidebar,
  ShellNavigation,
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
    />
  )}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/App').default}
      title="App"
      source={require('!!raw-loader!../examples/App').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/Event').default}
      title="Event"
      source={require('!!raw-loader!../examples/Event').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/shell"
      Component={require('../examples/Discover').default}
      title="Discover"
      source={require('!!raw-loader!../examples/Discover').default}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/Shell')}
    />
  )}
`;
