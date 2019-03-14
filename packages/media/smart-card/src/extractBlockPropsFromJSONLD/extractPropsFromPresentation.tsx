import * as React from 'react';

import { BlockCardResolvedViewProps } from '@uidu/media-ui';
import { extractPropsFromDocument } from './extractPropsFromDocument';
import Presentation24Icon from '@atlaskit/icon-file-type/glyph/presentation/24';
import PowerpointPresentation24Icon from '@atlaskit/icon-file-type/glyph/powerpoint-presentation/24';
import GoogleSlide24Icon from '@atlaskit/icon-file-type/glyph/google-slide/24';

export function extractPropsFromPresentation(
  json: any,
): BlockCardResolvedViewProps {
  const props = extractPropsFromDocument(json);

  // We use vendor-specific variations of the icons, whenever possible
  if (json.fileFormat === 'application/vnd.google-apps.presentation') {
    props.icon = (
      <GoogleSlide24Icon
        label={json.provider ? json.provider.name : 'Google Slides'}
      />
    );
  } else if (json.fileFormat === 'application/vnd.mspowerpoint') {
    props.icon = (
      <PowerpointPresentation24Icon
        label={json.provider ? json.provider.name : 'PowerPoint Presentation'}
      />
    );
  } else {
    props.icon = (
      <Presentation24Icon
        label={json.provider ? json.provider.name : 'Presentation'}
      />
    );
  }

  return props;
}
