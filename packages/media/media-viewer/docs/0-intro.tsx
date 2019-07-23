import { Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
MediaViewer is Atlassian's powerful solution for viewing files on the web. It's both powerful and extendable yet easy-to-integrate

  ${(
    <Example
      Component={require('../examples/Basic').default}
      title="Single File Preview"
      source={require('!!raw-loader!../examples/Basic').default}
      fullWidth
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/MediaViewer')}
    />
  )}
  `;
