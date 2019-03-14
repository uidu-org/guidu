// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  This package exports an number of different Avatar related components:

  Use the \`Avatar\` component to represent users with their profile picture.
  Optionally, a presence to indicate online status can also be displayed.

  You can use the \`Presence\` component independently for contexts where the
  profile picture is not required (e.g. next to a username).

  ## Usage

  ${code`import Accordion from '@uidu/accordion';`}

  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/01-basicAccordion')}
      title="Accordion"
      source={require('!!raw-loader!../examples/01-basicAccordion')}
    />
  )}


  ${(
    <Example
      packageName="@uidu/accordion"
      Component={require('../examples/02-basicNoCollapseAccordion')}
      title="Accordion no collapse"
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
