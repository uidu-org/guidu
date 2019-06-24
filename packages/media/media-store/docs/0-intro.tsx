import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
  This package is the Media Store API Web Client Library.

  ## Usage

  ${code`import { MediaImage } from '@uidu/media-store';

  `}

  ${(
    <Example
      Component={require('../examples/0-media-store').default}
      title="Media Store"
      source={require('!!raw-loader!../examples/0-media-store')}
    />
  )}
`;
