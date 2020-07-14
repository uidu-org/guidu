import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
\`AvatarItem\` is a wrapper designed to go around \`Avatar\`, when th avatar
will be displayed alongside text, such as a name and status.

## Usage

${code`import { AvatarItem } from '@uidu/avatar';`}

${(
  <Example
    packageName="@uidu/avatar"
    Component={require('../examples/03-basicAvatarItem').default}
    title="Avatar Item"
    source={require('!!raw-loader!../examples/03-basicAvatarItem').default}
  />
)}

${(
  <Props
    heading="Avatar Item Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarItem')}
  />
)}
`;
