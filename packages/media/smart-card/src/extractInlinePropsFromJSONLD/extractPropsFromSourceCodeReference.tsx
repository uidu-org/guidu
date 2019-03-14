import * as React from 'react';
import { InlineCardResolvedViewProps } from '@uidu/media-ui';
import BranchIcon from '@atlaskit/icon-object/glyph/branch/16';

import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { BuildInlineProps } from './types';

type BuildInlinePropsSourceCodeReference = BuildInlineProps<
  InlineCardResolvedViewProps
>;

export const buildIcon: BuildInlinePropsSourceCodeReference = json => {
  const name = json.name;
  return { icon: <BranchIcon label={name} /> };
};

export const extractInlineViewPropsFromSourceCodeReference = (
  json: any,
): InlineCardResolvedViewProps => {
  const props = extractInlineViewPropsFromObject(json);
  return {
    ...props,
    ...buildIcon(json),
  };
};
