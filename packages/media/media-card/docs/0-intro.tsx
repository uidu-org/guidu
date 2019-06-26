import { Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  This component shows media as cards, and supports files, images, videos and links. Special cases (links to Google Docs, Dropbox docs and such) are handled.

  ## Usage

${(
  <Example
    Component={require('../examples/Basic').default}
    title="File Card"
    source={require('!!raw-loader!../examples/Basic')}
  />
)}

${(
  <Props
    heading="Card Props"
    props={require('!!extract-react-types-loader!../src/components/MediaCard')}
  />
)}
`;
