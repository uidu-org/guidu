import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Media Card
  <p class="lead">Widely used component to show uploaded media (images, videos, docs)</p>

  Initially designed to work with a shrine-powered back-end <a href="https://shrinerb.com" target="_blank">Shrine</a>, but it can work with anything exposing similar API / response.

  MediaCard component is used in many other components, namely:
  - [editor-core](/packages/editor/editor-core)
  - [renderer](/packages/editor/renderer)
  - [email-renderer](/packages/editor/email-renderer)
  - [message-renderer](/packages/messaging/message-renderer) (MessageAttachments)
  - [message-form](/packages/messaging/message-form)
  - [media-filmstrip](/packages/media/media-filmstrip)

  <div class="py-3"></div>

  ##### Single Media cards

  ${code`import MediaCard from '@uidu/media-card';`}

  ${(
    <Example
      Component={require('../examples/Basic').default}
      title="File Card"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  <div class="py-3"></div>

  ##### Media card groups

  ${code`import { MediaCardGroup } from '@uidu/media-card';`}

  ${(
    <Example
      Component={require('../examples/MediaCardGroup').default}
      title="MediaCardGroup"
      source={require('!!raw-loader!../examples/MediaCardGroup').default}
    />
  )}

  ${(
    <Props
      heading="Card Props"
      props={require('!!extract-react-types-loader!../src/components/MediaCard')}
    />
  )}
`;
