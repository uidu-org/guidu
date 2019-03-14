import * as React from 'react';
import { InlineCardResolvedViewProps } from '@uidu/media-ui';
import PullRequestIcon from '@atlaskit/icon-object/glyph/pull-request/16';

import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { BuildInlineProps, AlterInlineProps } from './types';

type BuildInlinePropsSourceCodePullRequest = BuildInlineProps<
  InlineCardResolvedViewProps
>;
type AlterInlinePropsSourceCodePullRequest = AlterInlineProps<
  InlineCardResolvedViewProps
>;

export const buildName: AlterInlinePropsSourceCodePullRequest = (
  props,
  json,
) => {
  const nextProps = { ...props };
  const link = nextProps.link || json['@url'];
  if (link) {
    const repoNumber = link.match(/.*?(\d+)[^0-9]*$/).pop();
    return { title: `#${repoNumber} ${nextProps.title}` };
  }
  return nextProps;
};

const buildInlineSourceCodePullRequestTag: BuildInlinePropsSourceCodePullRequest = json => {
  if (json['atlassian:state']) {
    return {
      lozenge: {
        appearance: 'success',
        text: json['atlassian:state'],
      },
    };
  }
  return {};
};

export const buildIcon: BuildInlinePropsSourceCodePullRequest = json => {
  const name = json.name;
  return { icon: <PullRequestIcon label={name} /> };
};

export const extractInlineViewPropsFromSourceCodePullRequest = (
  json: any,
): InlineCardResolvedViewProps => {
  const props = extractInlineViewPropsFromObject(json);
  return {
    ...props,
    ...buildIcon(json),
    ...buildName(props, json),
    ...buildInlineSourceCodePullRequestTag(json),
  };
};
