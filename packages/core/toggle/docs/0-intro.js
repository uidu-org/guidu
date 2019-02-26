// @flow
import React from 'react';
import { md, Props, Example, code } from '@uidu/docs';

export default md`
  A Toggle component. It is a checkbox displayed in an alternative way.

  ## Usage

  ${code`import Toggle from '@uidu/toggle';`}

  The default export is a component that you can control and listen to events.

  ${(
    <Example
      packageName="@uidu/toggle"
      Component={require('../examples/0-stateful')}
      title="Basic"
      source={require('!!raw-loader!../examples/0-stateful')}
    />
  )}

  We also provide a stateless version of the component which allows you the ability
  to control whether the toggle is checked or not programatically

  ${(
    <Example
      packageName="@uidu/toggle"
      Component={require('../examples/1-stateless')}
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
