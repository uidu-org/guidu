import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  This package is required by other Media Components, and should not be used
  directly.

  ## Usage

  ${code`import { MediaImage } from '@uidu/media-picker';

  `}

  ${(
    <Example
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/MediaPicker')}
    />
  )}
`;
