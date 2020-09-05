import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Tabs
  <p class="lead">Tabs component</p>

  Tabs are used to organize content by grouping similar information on the same page.

  ${code`import Tabs, { TabItem } from '@uidu/tabs';`}

  ${(
    <Example
      packageName="@uidu/tabs"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/Tabs')}
    />
  )}
`;
