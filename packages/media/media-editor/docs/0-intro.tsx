import * as React from 'react';
import { md, code, Example, Props } from '@uidu/docs';

export default md`
  This component provides a way to do image annotations.

  ## Usage

  ${code`
  import { MediaEditor } from '@uidu/media-editor';
  import { tallImage as imageDataUri } from '@uidu/media-test-helpers';

  const App = () => (
    <MediaEditor
      imageUrl={imageDataUri}
      tool={'arrow'}
    />
  );
  `}

    ${(
      <Example
        Component={require('../examples/4-smart-media-editor').default}
        title="Fixed Sized"
        source={require('!!raw-loader!../examples/4-smart-media-editor')}
      />
    )}

  ${(
    <Props
      heading="Media Editor Props"
      props={require('!!extract-react-types-loader!../src/react/mediaEditor')}
    />
  )}

  ${(
    <Props
      heading="Toolbar Props"
      props={require('!!extract-react-types-loader!../src/react/toolbar')}
    />
  )}
`;
