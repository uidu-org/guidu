// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  Accordion component that uses [react-accessible-accordion](https://github.com/springload/react-accessible-accordion)

  ## Usage

  ${code`import Accordion from '@uidu/accordion';`}

  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/Basic').default}
      title="Accordion allowMultipleExpanded"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}


  ${(
    <Props
      heading="Accordion Props"
      props={require('!!extract-react-types-loader!../src/components/Tabbar')}
    />
  )}
`;
