// @flow
import React from 'react';
import { code, Props, md } from '@atlaskit/docs';

import { Hr, IframeExample } from './shared';

export default md`This component is a wrapper around the \`GlobalNav\` primitive component from \`navigation-next\`. It provides a lot of features, configuration, and state management out of the box while exposing a more opinionated API. If you are building an Atlassian product you should use this component to ensure that our users get a consistent experience across our products. It will also make it easier for platform to ship updates to the experience without you needing to do any work!

If you are building an application that isn't an Atlassian product and you want to configure the global navigation area in a unique way, use [the component exported by \`navigation-next\`](/packages/core/navigation-next/docs/ui-components#globalnav).

${<Hr />}

## Usage

${code`import GlobalNavigation from '@atlaskit/global-navigation';`}

${(
  <IframeExample
    source={require('!!raw-loader!../examples/00-basic-global-navigation')}
    title="The GlobalNavigation component"
    url="/examples.html?groupId=core&packageId=global-navigation&exampleId=basic-global-navigation"
  />
)}

${(
  <Props
    heading="GlobalNavigation props"
    props={require('!!extract-react-types-loader!../src/components/GlobalNavigation')}
  />
)}
`;
