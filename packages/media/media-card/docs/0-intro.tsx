import * as React from 'react';
import { md, code, Example, Props } from '@uidu/docs';

export default md`
This component provides 2 exports:

  1.  Card
  2.  CardView

  ### Note:

  Don't forget to add polyfills for fetch, ES6 & ES7 to your product build if you want to target older browsers.
  We recommend the use of [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/) & [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)

  ## Usage

  ### Card

  ${code`
  import { Card } from '@uidu/media-card';
  import { ContextFactory } from '@uidu/media-core';

  const context = ContextFactory.create({
    tokenProvider,
  });

  // url preview
  const urlPreviewId = {
    mediaItemType: 'link',
    url: 'https://atlassian.com',
  };

  <Card context={context} identifier={urlPreviewId} />;

  // stored link
  const linkId = {
    mediaItemType: 'link',
    id: 'some-link-id',
    collectionName: 'some-collection-name',
  };

  <Card context={context} identifier={linkId} />;

  // stored file
  const fileId = {
    mediaItemType: 'file',
    id: 'some-file-id',
    collectionName: 'some-collection-name',
  };

  <Card context={context} identifier={fileId} />;
`}

### Card View

${code`
import { CardView } from @uidu/media-card;
const resizeModes: Array<ImageResizeMode> = ['crop', 'fit', 'full-fit'];

export const createCardsOfDifferentResizeModes = () => {
  return resizeModes.map(mode => {
    const content = images.map(img => (
      <CardView
        appearance="image"
        status="complete"
        resizeMode={mode}
        dataURI={img}
      />
    ));

    return {
      title: mode,
      content,
    };
  });
};
`}

${(
  <Example
    Component={require('../examples/0-file-card-flow').default}
    title="File Card"
    source={require('!!raw-loader!../examples/0-file-card-flow')}
  />
)}

${(
  <Props
    heading="Card Props"
    props={require('!!extract-react-types-loader!../src/files/card')}
  />
)}

${(
  <Props
    heading="Card View Props"
    props={require('!!extract-react-types-loader!../src/files/cardImageView')}
  />
)}

`;
