import {
  DateSharedCssClassName,
  isPastDate,
  timestampToString,
  timestampToTaskContext,
} from '@uidu/editor-common';
import React from 'react';
import { useIntl } from 'react-intl';

export interface Props {
  timestamp: string;
  parentIsIncompleteTask?: boolean;
}

export default function Date({ timestamp, parentIsIncompleteTask }: Props) {
  const intl = useIntl();

  const className =
    !!parentIsIncompleteTask && isPastDate(timestamp)
      ? 'date-node date-node-highlighted'
      : 'date-node';
  return (
    <span className={DateSharedCssClassName.DATE_WRAPPER}>
      <span
        className={className}
        data-node-type="date"
        data-timestamp={timestamp}
      >
        {parentIsIncompleteTask
          ? timestampToTaskContext(timestamp, intl)
          : timestampToString(timestamp, intl)}
      </span>
    </span>
  );
}
