import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import {
  Context,
  FileState,
  isErrorFileState,
  FileIdentifier,
} from '@uidu/media-core';
import { DownloadButtonWrapper } from './styled';
import Button from '@uidu/button';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import {
  downloadButtonEvent,
  downloadErrorButtonEvent,
} from './analytics/download';
import { channel } from './analytics';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { MediaViewerError } from './error';

const downloadIcon = <DownloadIcon label="Download" />;

// TODO: MS-1556
export const DownloadButton: any = withAnalyticsEvents({
  onClick: (createEvent: CreateUIAnalyticsEventSignature, props: any) => {
    const ev = createEvent(props.analyticsPayload);
    ev.fire(channel);
  },
})(Button as any);

export const createItemDownloader = (
  file: FileState,
  context: Context,
  collectionName?: string,
) => () => {
  const id = file.id;
  const name = !isErrorFileState(file) ? file.name : undefined;
  return context.file.downloadBinary(id, name, collectionName);
};

export type ErrorViewDownloadButtonProps = {
  state: FileState;
  context: Context;
  err: MediaViewerError;
  collectionName?: string;
};

export const ErrorViewDownloadButton = (
  props: ErrorViewDownloadButtonProps,
) => {
  const downloadEvent = downloadErrorButtonEvent(props.state, props.err);
  return (
    <DownloadButtonWrapper>
      <DownloadButton
        analyticsPayload={downloadEvent}
        appearance="primary"
        onClick={createItemDownloader(
          props.state,
          props.context,
          props.collectionName,
        )}
      >
        <FormattedMessage {...messages.download} />
      </DownloadButton>
    </DownloadButtonWrapper>
  );
};

export type ToolbarDownloadButtonProps = {
  state: FileState;
  identifier: FileIdentifier;
  context: Context;
};

export const ToolbarDownloadButton = (props: ToolbarDownloadButtonProps) => {
  const downloadEvent = downloadButtonEvent(props.state);
  return (
    <DownloadButton
      analyticsPayload={downloadEvent}
      appearance={'toolbar' as any}
      onClick={createItemDownloader(
        props.state,
        props.context,
        props.identifier.collectionName,
      )}
      iconBefore={downloadIcon}
    />
  );
};

export const DisabledToolbarDownloadButton = (
  <Button
    appearance={'toolbar' as any}
    isDisabled={true}
    iconBefore={downloadIcon}
  />
);
