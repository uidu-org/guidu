import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Inline Dialog components launch a modal that is displayed outside a block of content, and over the top of surrounding elements. They can be made to change position to fit in the page.

  The content takes two different react elements:

    - The children, which are the elements the modal will be positioned relative to, using the position prop.
    - The content, which is the content to display inside the modal.

  ## Usage

  ${code`
  import InlineDialog from '@uidu/inline-dialog';
  `}

  ${(
    <Example
      packageName="@uidu/inline-dialog"
      title="Basic"
      Component={require('../examples/01-basic').default}
      source={require('!!raw-loader!../examples/01-basic').default}
    />
  )}

  ${(
    <Props
      heading="InlineDialog Props"
      props={require('!!extract-react-types-loader!../src/InlineDialog')}
    />
  )}
`;
