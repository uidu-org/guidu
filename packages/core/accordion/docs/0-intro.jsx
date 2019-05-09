// @flow
import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Accordion component that uses [react-accessible-accordion](https://github.com/springload/react-accessible-accordion)

  ## Usage

  ${code`import Accordion from '@uidu/accordion';`}

  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/01-basicAccordion').default}
      title="Accordion allowMultipleExpanded"
      source={require('!!raw-loader!../examples/01-basicAccordion')}
    />
  )}


  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/02-basicNoCollapseAccordion').default}
      title="Accordion no allowMultipleExpanded"
      source={require('!!raw-loader!../examples/02-basicNoCollapseAccordion')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/03-reverse').default}
      title="Accordion no allowMultipleExpanded"
      source={require('!!raw-loader!../examples/03-reverse')}
    />
  )}

  ${(
    <Props
      heading="Accordion Props"
      props={require('!!extract-react-types-loader!../src/components/Accordion')}
    />
  )}
`;
