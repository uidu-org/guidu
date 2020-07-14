// @flow
import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Spinners are used for showing a system process of unknown length going on
  that ends with the system displaying results to the user. The spinner
  animates in, as well as animating out when \`isCompleting\` is
  passed to it.

  The inverted spinner matches the dark spinner for display in non-dark
  contexts. In a dark context, the inverted spinner remains the same color.

  ## Usage

  ${code`import Spinner from '@uidu/spinner';`}

  ${(
    <Example
      packageName="@uidu/spinner"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/spinner"
      Component={require('../examples/1-usage').default}
      title="Animation Options"
      source={require('!!raw-loader!../examples/1-usage').default}
    />
  )}

  ${(
    <Props
      heading="Spinner Props"
      props={require('!!extract-react-types-loader!../src/Spinner')}
    />
  )}
`;
