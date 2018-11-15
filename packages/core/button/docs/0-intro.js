// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  ### Usage

  A checkbox element primarily for use in forms.

  ${code`
  import { Button } from '@uidu/button';
  `}

  The Checkbox export provides for controlled & uncontrolled usage and includes the label, input & icon.

  ${(
    <Example
      packageName="@uidu/button"
      Component={require('../examples/00-basic-usage')}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-usage')}
    />
  )}
`;
