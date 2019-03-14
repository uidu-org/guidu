import * as React from 'react';
import { md, code, Example, Props } from '@uidu/docs';

export default md`
  This package is required by other Media Components, and should not be used
  directly.

  ## Usage

  ${code`import { MediaImage } from '@uidu/media-image';

  `}

  ${(
    <Example
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${<Props props={require('!!extract-react-types-loader!../src/mediaImage')} />}
`;
