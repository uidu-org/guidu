import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ## Usage

  ${code`import FieldRadio from '@uidu/field-radio';`}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Group').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Group').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Grid').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Grid').default}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/Radio')}
    />
  )}
  `;
