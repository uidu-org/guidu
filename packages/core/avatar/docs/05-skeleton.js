// @flow
import React from 'react';
import { md, Example, Props } from '@uidu/docs';

export default md`

${(
  <Example
    packageName="@atlaskit/avatar"
    Component={require('../examples/15-skeleton')}
    title="AvatarGroup"
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
