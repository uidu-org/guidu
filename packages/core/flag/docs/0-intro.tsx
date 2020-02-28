import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Flags are designed to place a message above the regular page content.
  The <code>Flag</code> component applies styling, while <code>FlagGroup</code> animates
  the loading and unloading of flags.

  ## Usage

  ${code`import Flag, { AutoDismissFlag, FlagGroup } from '@uidu/flag';`}

  It is recommended to wrap your application with the
  [Layer Manager](https://uidu.atlassian.com/components/layer-manager) component to
  control where the flag is rendered and to ensure layered components like flag and modal stack
  in the correct order.

  Flags will fallback to being appended to the \`<body>\` if an ancestor Layer Manager does not exist.

  ${(
    <Example
      packageName="@uidu/flag"
      Component={require('../examples/01-flag-without-flagGroup').default}
      title="Flag without group"
      source={
        require('!!raw-loader!../examples/01-flag-without-flagGroup').default
      }
    />
  )}

  ${(
    <Example
      packageName="@uidu/flag"
      Component={require('../examples/11-bold-flag-component').default}
      title="Flag using bold"
      source={
        require('!!raw-loader!../examples/11-bold-flag-component').default
      }
    />
  )}

  ${(
    <Example
      packageName="@uidu/flag"
      Component={require('../examples/12-flag-group').default}
      title="Flag group"
      source={require('!!raw-loader!../examples/12-flag-group').default}
    />
  )}

  ${(
    <Props
      heading="Flag Props"
      props={require('!!extract-react-types-loader!../src/components/Flag')}
    />
  )}

  ${(
    <Props
      heading="Auto Dismiss Flag Props"
      props={require('!!extract-react-types-loader!../src/components/AutoDismissFlag')}
    />
  )}

  ${(
    <Props
      heading="Flag Group Props"
      props={require('!!extract-react-types-loader!../src/components/FlagGroup')}
    />
  )}

`;
