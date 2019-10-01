import { EventHandlers, UnsupportedInline } from '@uidu/editor-common';
import MediaCard from '@uidu/media-card';
import * as React from 'react';
import {
  withSmartCardStorage,
  WithSmartCardStorageProps,
} from '../../ui/SmartCardStorage';
import { getEventHandler } from '../../utils';
import { CardErrorBoundary } from './fallback';

interface InlineCardProps {
  url?: string;
  data?: object;
  eventHandlers?: EventHandlers;
  portal?: HTMLElement;
}

const InlineCard: React.FunctionComponent<
  InlineCardProps & WithSmartCardStorageProps
> = props => {
  const { url, data, eventHandlers, portal } = props;
  const handler = getEventHandler(eventHandlers, 'smartCard');
  const onClick = url && handler ? () => handler(url) : undefined;

  const cardProps = { src: url, data, onClick, container: portal };
  return (
    <span
      data-inline-card
      data-card-data={data ? JSON.stringify(data) : undefined}
      data-card-url={url}
    >
      <CardErrorBoundary
        unsupportedComponent={UnsupportedInline}
        {...cardProps}
      >
        <MediaCard file={cardProps} {...cardProps} />
      </CardErrorBoundary>
    </span>
  );
};

export default withSmartCardStorage(InlineCard);
