// @flow
import React from 'react';
import { md, Props } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';

export default md`
  ${(
    <SectionMessage appearance="error">
      <p>
        <strong>Note: @atlaskit/navigation is now deprecated.</strong>
      </p>
      <p>We recommend upgrading to @atlaskit/navigation-next</p>
    </SectionMessage>
  )}

  These are the props available to the main \`Navigation\` component export. They
  are used for both controlling the appearance of itself and other sub-components
  as well as fixing the layout of the navigation components by acceptin many
  of them as props.

  ${(
    <Props
      shouldCollapseProps
      heading="Navigation Props"
      props={require('!!extract-react-types-loader!../src/components/js/Navigation.js')}
    />
  )}
`;
