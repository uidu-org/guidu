import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Accordion component that uses [react-accessible-accordion](https://github.com/springload/react-accessible-accordion)

  ## Usage

  ${code`import Tabbar, { TabbarLink } from '@uidu/tabbar';`}

  ${(
    <Example
      packageName="@uidu/tabbar"
      Component={require('../examples/Basic').default}
      title="Accordion allowMultipleExpanded"
      source={require('!!raw-loader!../examples/Basic').default}
      fullWidth
      overflowHidden
    />
  )}


  ${(
    <Props
      heading="Tabbar Props"
      props={require('!!extract-react-types-loader!../src/components/Tabbar')}
    />
  )}
`;
