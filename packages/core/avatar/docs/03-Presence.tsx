import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

The \`Presence\` component is the status dot. In most cases, you will not need to use
the presence component directly, as passing string values of 'presence' to \`Avatar\` will
use the selected presence. Presence is displayed at the bottom right of the avatar.

${code`import { Presence } from '@uidu/avatar';`}

${(
  <Example
    packageName="@uidu/avatar"
    Component={require('../examples/04-basicPresence').default}
    title="Presence"
    source={require('!!raw-loader!../examples/04-basicPresence').default}
  />
)}

${(
  <Props
    heading="Presence Props"
    props={require('!!extract-react-types-loader!../src/components/Presence')}
  />
)}
`;
