import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  # Data Controls

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

  ${(
    <Props
      heading="Filterer"
      props={require('!!extract-react-types-loader!../src/components/Filterer')}
    />
  )}
  ${(
    <Props
      heading="Finder"
      props={require('!!extract-react-types-loader!../src/components/Finder')}
    />
  )}
  ${(
    <Props
      heading="Grouper"
      props={require('!!extract-react-types-loader!../src/components/Grouper')}
    />
  )}
  ${(
    <Props
      heading="More"
      props={require('!!extract-react-types-loader!../src/components/More')}
    />
  )}
  ${(
    <Props
      heading="Resizer"
      props={require('!!extract-react-types-loader!../src/components/Resizer')}
    />
  )}
  ${(
    <Props
      heading="Sharer"
      props={require('!!extract-react-types-loader!../src/components/Sharer')}
    />
  )}
  ${(
    <Props
      heading="Sorter"
      props={require('!!extract-react-types-loader!../src/components/Sorter')}
    />
  )}
  ${(
    <Props
      heading="Toggler"
      props={require('!!extract-react-types-loader!../src/components/Toggler')}
    />
  )}
  ${(
    <Props
      heading="Viewer"
      props={require('!!extract-react-types-loader!../src/components/Viewer')}
    />
  )}

`;
