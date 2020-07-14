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

  ${code`import SectionMessage from '@uidu/section-message';`}

  ${(
    <Example
      packageName="@uidu/section-message"
      title="Basic"
      Component={require('../examples/00-basic-example').default}
      source={require('!!raw-loader!../examples/00-basic-example').default}
    />
  )}

  Section messages also have an appearance property for their different use-cases.

  ${(
    <Example
      packageName="@uidu/section-message"
      title="Appearance Variations"
      Component={require('../examples/01-appearance-variations').default}
      source={
        require('!!raw-loader!../examples/01-appearance-variations').default
      }
    />
  )}

  ${(
    <Props
      heading="SectionMessage Props"
      props={require('!!extract-react-types-loader!../src/components/SectionMessage')}
    />
  )}
`;
