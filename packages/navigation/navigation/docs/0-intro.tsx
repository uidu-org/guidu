import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import Navigation, { GlobalNavigation } from '@uidu/navigation';`}

  ${(
    <Example
      packageName="@uidu/navigation"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
      overflowHidden
      fullWidth
    />
  )}

  ${(
    <Example
      packageName="@uidu/navigation"
      Component={require('../examples/Skeleton').default}
      title="Skeleton"
      source={require('!!raw-loader!../examples/Skeleton')}
      overflowHidden
      fullWidth
    />
  )}

  ${(
    <Example
      packageName="@uidu/navigation"
      Component={require('../examples/Icon').default}
      title="Icon Navigation"
      source={require('!!raw-loader!../examples/Icon')}
      overflowHidden
      fullWidth
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/GlobalNavigation')}
    />
  )}
`;
