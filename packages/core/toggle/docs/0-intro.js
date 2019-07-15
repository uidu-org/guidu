// @flow
import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  A Toggle component. It is a checkbox displayed in an alternative way.

  The default export is a component that you can control and listen to events.

  ## Toggle

  ${code`import Toggle from '@uidu/toggle';`}

  ${(
    <Example
      packageName="@uidu/toggle"
      Component={require('../examples/0-stateful').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-stateful')}
    />
  )}

  ## Toggle Stateless

  We also provide a stateless version of the component which allows you the ability
  to control whether the toggle is checked or not programatically

  ${code`import { ToggleStateless } from '@uidu/toggle';`}


  ${(
    <Example
      packageName="@uidu/toggle"
      Component={require('../examples/1-stateless').default}
      title="Stateless"
      source={require('!!raw-loader!../examples/1-stateless')}
    />
  )}

  ${(
    <Props
      heading="Toggle Default Props"
      props={require('!!extract-react-types-loader!../src/Toggle')}
    />
  )}

  ${(
    <Props
      heading="Toggle Stateless Props"
      props={require('!!extract-react-types-loader!../src/ToggleStateless')}
    />
  )}
`;
