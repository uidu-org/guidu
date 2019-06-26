import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a button-group component to make it easy to display
  multiple buttons together.

  ## Usage

  ${code`import Button, { ButtonGroup } from '@uidu/button';`}

  ${(
    <Example
      packageName="@uidu/button"
      Component={require('../examples/Basic').default}
      title="Basic exposed options select"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/button"
      Component={require('../examples/Dropdown').default}
      title="Dropdown select"
      source={require('!!raw-loader!../examples/Dropdown')}
    />
  )}

  ${(
    <Props
      heading="Downshift Props"
      props={require('!!extract-react-types-loader!../src/components/FieldDownshift')}
    />
  )}
`;
