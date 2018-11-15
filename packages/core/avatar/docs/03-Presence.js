// @flow
import React from 'react';
import { md, Example, Props } from '@uidu/docs';

export default md`
  The \`Presence\` component is the status dot. In most cases, you will not need to use
  the presence component directly, as passing string values of 'presence' to \`Avatar\` will
  use the selected presence. Presence is displayed at the bottom right of the avatar.

${(
  <Example
    packageName="@atlaskit/avatar"
    Component={require('../examples/04-basicPresence')}
    title="Presence"
    source={require('!!raw-loader!../examples/04-basicPresence')}
  />
)}

${(
  <Props
    heading="Presence Props"
    props={require('!!extract-react-types-loader!../src/components/Presence')}
  />
)}
`;
