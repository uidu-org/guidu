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

  Drawers are designed to enter from the left of the screen and overlay the site,
  allowing additional options to be visible that are outside or may change the
  page. The two standard drawers are \`AkCreateDrawer\` and \`AkSearchDrawer\`,
  which are designed to line up with the global navigation icons to open them.

  Navigation also exports components to implement search.

  ${(
    <Props
      shouldCollapseProps
      heading="AkCreateDrawer Props"
      props={require('!!extract-react-types-loader!../src/components/js/drawers/CreateDrawer.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkSearchDrawer Props"
      props={require('!!extract-react-types-loader!../src/components/js/drawers/SearchDrawer.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkCustomDrawer Props"
      props={require('!!extract-react-types-loader!../src/components/js/drawers/CustomDrawer.js')}
    />
  )}
`;
