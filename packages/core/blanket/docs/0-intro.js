// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

Blanket provides the overlay layer for components such as a modal dialog or a tooltip.

## Usage

${code`import Blanket from '@uidu/blanket';`}

The blanket component is designed to be used with a modal or popup, and
overlay the rest of the page. It provides an onBlanketClicked option that is designed to catch clicks
elsewhere on the page other than the modal.

Blanket does not have its own show/hide functionality, as it should be
shown or hidden with its parent element.

  ${(
    <Example
      packageName="@uidu/blanket"
      Component={require('../examples/00-basic-usage')}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-usage')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/blanket"
      Component={require('../examples/01-click-through')}
      title="With click through enabled"
      source={require('!!raw-loader!../examples/01-click-through')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/Blanket')}
      heading="Blanket Props"
    />
  )}

`;
