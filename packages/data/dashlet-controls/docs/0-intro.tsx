import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Dashlets Controls
  <p class="lead">Controls for filtering/editing dashlets</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.
  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import Stepper, { Step } from '@uidu/stepper';`}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}


  ${(
    <Props
      heading="Sorter Types"
      props={require('!!extract-react-types-loader!../src/components/TimeFrame')}
    />
  )}
  ${(
    <Props
      heading="Sorter Types"
      props={require('!!extract-react-types-loader!../src/components/TimeFrameGrouper')}
    />
  )}
  ${(
    <Props
      heading="Sorter Types"
      props={require('!!extract-react-types-loader!../src/components/TimeFrameComparator')}
    />
  )}

`;
