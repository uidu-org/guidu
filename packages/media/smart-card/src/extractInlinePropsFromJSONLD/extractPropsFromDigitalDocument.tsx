import * as React from 'react';
import { InlineCardResolvedViewProps } from '@uidu/media-ui';
import FileIcon from '@atlaskit/icon-file-type/glyph/generic/16';

import { BuildInlineProps } from './types';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';

type BuildInlinePropsDigitalDocument = BuildInlineProps<
  InlineCardResolvedViewProps
>;

export const buildIcon: BuildInlinePropsDigitalDocument = json => {
  const name = json.name;
  return { icon: <FileIcon label={name} /> };
};

export const extractInlineViewPropsFromDigitalDocument = (
  json: any,
): InlineCardResolvedViewProps => {
  const props = extractInlineViewPropsFromDocument(json);
  return {
    ...props,
    ...buildIcon(json),
  };
};
