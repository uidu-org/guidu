/* tslint:disable:no-console */
import * as React from 'react';
import {
  StoryList,
  createStorybookContext,
  imageFileId,
  unknownFileId,
  errorFileId,
} from '@uidu/media-test-helpers';
import { AnalyticsListener } from '@atlaskit/analytics-next';

import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
// @ts-ignore
import { AtlaskitThemeProvider } from '@uidu/theme';
import { FileIdentifier } from '@uidu/media-core';
import { Card } from '../src';
import { createApiCards, actions } from '../example-helpers';

const context = createStorybookContext();
// standard
const successIdentifier: FileIdentifier = imageFileId;
const standardCards = [
  {
    title: 'Image',
    content: (
      <Card
        identifier={successIdentifier}
        context={context}
        appearance="image"
      />
    ),
  },
];

// errors
const errorCards = [
  {
    title: 'Image',
    content: (
      <Card identifier={errorFileId} context={context} appearance="image" />
    ),
  },
];

const menuCards = [
  {
    title: 'Image',
    content: (
      <Card
        identifier={successIdentifier}
        context={context}
        appearance="image"
        actions={actions}
      />
    ),
  },
];

// api cards
const apiCards = createApiCards('image', successIdentifier);

// no thumbnail
const noThumbnailCards = [
  {
    title: 'Image',
    content: (
      <Card identifier={unknownFileId} context={context} appearance="image" />
    ),
  },
];

// lazy load
const lazyLoadCards = [
  {
    title: 'Lazy',
    content: (
      <Card
        isLazy={true}
        identifier={successIdentifier}
        context={context}
        appearance="image"
      />
    ),
  },
  {
    title: 'No lazy',
    content: (
      <Card
        isLazy={false}
        identifier={successIdentifier}
        context={context}
        appearance="image"
      />
    ),
  },
];

// no hover state cards
const noHoverStateCards = [
  {
    title: 'Overlay disabled',
    content: (
      <Card
        identifier={successIdentifier}
        context={context}
        appearance="image"
        disableOverlay={true}
      />
    ),
  },
  {
    title: 'Selected',
    content: (
      <Card
        identifier={successIdentifier}
        context={context}
        appearance="image"
        disableOverlay={true}
        selectable={true}
        selected={true}
      />
    ),
  },
];

// collection and no collection configuration of files
const fileWithNoCollection: FileIdentifier = {
  mediaItemType: 'file',
  id: 'e84c54a4-38b2-463f-ae27-5ba043c3e4c2',
};

const collectionConfigCards = [
  {
    title: 'Standalone file (NO collection)',
    content: <Card identifier={fileWithNoCollection} context={context} />,
  },
  {
    title: 'File within collection',
    content: <Card identifier={successIdentifier} context={context} />,
  },
];
const handleEvent = (analyticsEvent: UIAnalyticsEventInterface) => {
  const { payload, context } = analyticsEvent;
  console.log('Received event:', { payload, context });
};

export default () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <AnalyticsListener channel="media" onEvent={handleEvent}>
      <div>
        <h1 style={{ margin: '10px 20px' }}>File cards</h1>
        <div style={{ margin: '20px 40px' }}>
          <h3>Standard</h3>
          <StoryList>{standardCards}</StoryList>

          <h3>Error</h3>
          <StoryList>{errorCards}</StoryList>

          <h3>Menu</h3>
          <StoryList>{menuCards}</StoryList>

          <h3>API Cards</h3>
          <StoryList>{apiCards}</StoryList>

          <h3>Thumbnail not available</h3>
          <StoryList>{noThumbnailCards}</StoryList>

          <h3>Lazy load</h3>
          <StoryList>{lazyLoadCards}</StoryList>

          <h3>Collection configurations</h3>
          <StoryList>{collectionConfigCards}</StoryList>

          <h3>Overlay disabled</h3>
          <StoryList>{noHoverStateCards}</StoryList>
        </div>
      </div>
    </AnalyticsListener>
  </AtlaskitThemeProvider>
);
