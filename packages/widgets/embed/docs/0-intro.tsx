import { Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Side Navigation
  <p class="lead">A highly composable side navigation component that supports nested views.</p>



  ${(
    <Example
      packageName="@uidu/embed"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
      overflowHidden
      fullWidth
    />
  )}
`;
