import { LinkDefinition } from '@uidu/adf-schema';
import { AnalyticsEventPayload } from '@uidu/analytics';
import {
  EventHandlers,
  ProviderFactory,
  WithProviders,
} from '@uidu/editor-common';
import * as React from 'react';
import { MediaCard } from '../../ui/MediaCard';

export interface MediaProps {
  file: any;
  providers?: ProviderFactory;
  allowAltTextOnImages?: boolean;
  children?: React.ReactNode;
  isInsideOfBlockNode?: boolean;
  marks: Array<LinkDefinition>;
  isLinkMark: () => boolean;
  fireAnalyticsEvent?: (event: AnalyticsEventPayload) => void;
  // featureFlags?: MediaFeatureFlags;
  eventHandlers?: EventHandlers;
  enableDownloadButton?: boolean;
}

export default function Media(props: MediaProps) {
  return (
    <WithProviders
      providers={['mediaProvider']}
      providerFactory={props.providers}
      renderNode={(providers) => (
        <MediaCard mediaProvider={providers.mediaProvider} {...props} />
      )}
    />
  );
}
