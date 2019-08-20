import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

The \`Skeleton\`component is used for loading states.

## Usage

${code`import { Skeleton } from '@uidu/avatar';`}

${(
  <Example
    packageName="@uidu/avatar"
    Component={require('../examples/15-skeleton').default}
    title="Skeleton"
    source={require('!!raw-loader!../examples/15-skeleton')}
  />
)}

${(
  <Props
    heading="Skeleton Props"
    props={require('!!extract-react-types-loader!../src/components/Skeleton')}
  />
)}
`;
