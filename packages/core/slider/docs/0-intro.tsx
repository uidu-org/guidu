import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Section messages are part of the content of a user interface, and are used to
  alert users of a particular screen area that needs user action. These
  notifications can appear within a page or dialog. They are not dismissible,
  and only disappear once the issue has been resolved.

  The section message component is quite simple in its implementation, with three
  different sections, a heading, a body, and actions.

  A section message will fill the width of its container.

  ## Usage

  ${code`import Slider from '@uidu/slider';`}

  ${(
    <Example
      packageName="@uidu/slider"
      title="Basic"
      Component={require('../examples/Basic').default}
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  Section messages also have an appearance property for their different use-cases.

  ${(
    <Props
      heading="Slider Props"
      props={require('!!extract-react-types-loader!../src/components/Slider')}
    />
  )}
`;
