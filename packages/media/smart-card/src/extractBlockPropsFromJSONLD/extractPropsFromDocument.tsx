import * as React from 'react';
import { FormattedRelative } from 'react-intl';

import { BlockCardResolvedViewProps } from '@uidu/media-ui';
import { extractPropsFromObject } from './extractPropsFromObject';
import ChatIcon from '@atlaskit/icon/glyph/comment';
import { colors } from '@uidu/theme';
import { getIconForFileType, getLabelForFileType } from '../getIconForFileType';

type Person = {
  name: string;
  icon?: {
    url: string;
  };
};

export function extractPropsFromDocument(
  json: any,
): BlockCardResolvedViewProps {
  const props = extractPropsFromObject(json);

  props.icon = getIconForFileType(json.fileFormat || '');
  props.details = [];

  if (json.commentCount) {
    const { commentCount } = json;
    const intCommentCount = parseInt(commentCount, 10);

    // Only show the comment count if it's a string or an integer > 0
    if (isNaN(intCommentCount) || intCommentCount) {
      props.details.push({
        icon: (
          <ChatIcon
            label=""
            key="comments-count-icon"
            size="medium"
            primaryColor={colors.N600}
          />
        ),
        text: `${json.commentCount}`,
      });
    }
  }

  const typeDescription =
    getLabelForFileType(json.fileFormat || '') || 'Document';

  // Note: we're relying on the consumers to pass a proper react-intl context that
  // formats relative time according to the spec:
  // https://hello.atlassian.net/wiki/spaces/ADG/pages/195123084/Date+formats+product+1.0+spec
  if (json.updated && json.updatedBy) {
    let lastPerson: Person;

    if (Array.isArray(json.updatedBy)) {
      lastPerson = json.updatedBy.pop();
      props.details.concat(
        json.updatedBy.map((person: Person) => ({
          text: person.name,
          icon: person.icon,
        })),
      );
    } else {
      lastPerson = json.updatedBy;
    }

    props.byline = (
      <span>
        {typeDescription} · Updated by {lastPerson.name}{' '}
        <FormattedRelative value={json.updated} />
      </span>
    );
  } else if (json.attributedTo) {
    const person = Array.isArray(json.attributedTo)
      ? json.attributedTo.pop()
      : json.attributedTo;

    props.byline = (
      <span>
        {typeDescription} · Created by {person.name}{' '}
        <FormattedRelative value={json.dateCreated} />
      </span>
    );
  }

  if (json.image && json.image.url) {
    props.preview = json.image.url;
  }

  return props;
}
