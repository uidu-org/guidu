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
      Component={require('../examples/01-basicAccordion')}
      title="Accordion allowMultipleExpanded"
      source={require('!!raw-loader!../examples/01-basicAccordion')}
    />
  )}


  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/02-basicNoCollapseAccordion')}
      title="Accordion no allowMultipleExpanded"
      source={require('!!raw-loader!../examples/02-basicNoCollapseAccordion')}
    />
  )}

  ${(
    <Props
      heading="Accordion Props"
      props={require('!!extract-react-types-loader!../src/components/Accordion')}
    />
  )}
`;
