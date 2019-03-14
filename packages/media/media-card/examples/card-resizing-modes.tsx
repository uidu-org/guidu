import * as React from 'react';
import {
  StoryList,
  createStorybookContext,
  smallImageFileId,
  wideImageFileId,
  largeImageFileId,
} from '@uidu/media-test-helpers';

import { Card } from '../src';

const context = createStorybookContext();
const defaultCards = [
  {
    title: 'Small',
    content: <Card identifier={smallImageFileId} context={context} />,
  },
  {
    title: 'Wide',
    content: <Card identifier={wideImageFileId} context={context} />,
  },
  {
    title: 'Large',
    content: <Card identifier={largeImageFileId} context={context} />,
  },
];
const croppedCards = [
  {
    title: 'Small',
    content: (
      <Card identifier={smallImageFileId} context={context} resizeMode="crop" />
    ),
  },
  {
    title: 'Wide',
    content: (
      <Card identifier={wideImageFileId} context={context} resizeMode="crop" />
    ),
  },
  {
    title: 'Large',
    content: (
      <Card identifier={largeImageFileId} context={context} resizeMode="crop" />
    ),
  },
];
const fitCards = [
  {
    title: 'Small',
    content: (
      <Card identifier={smallImageFileId} context={context} resizeMode="fit" />
    ),
  },
  {
    title: 'Wide',
    content: (
      <Card identifier={wideImageFileId} context={context} resizeMode="fit" />
    ),
  },
  {
    title: 'Large',
    content: (
      <Card identifier={largeImageFileId} context={context} resizeMode="fit" />
    ),
  },
];
const fullFitCards = [
  {
    title: 'Small',
    content: (
      <Card
        identifier={smallImageFileId}
        context={context}
        resizeMode="full-fit"
      />
    ),
  },
  {
    title: 'Wide',
    content: (
      <Card
        identifier={wideImageFileId}
        context={context}
        resizeMode="full-fit"
      />
    ),
  },
  {
    title: 'Large',
    content: (
      <Card
        identifier={largeImageFileId}
        context={context}
        resizeMode="full-fit"
      />
    ),
  },
];

export default () => (
  <div>
    <h3>Default</h3>
    <StoryList>{defaultCards}</StoryList>
    <h3>Crop</h3>
    <StoryList>{croppedCards}</StoryList>
    <h3>Fit</h3>
    <StoryList>{fitCards}</StoryList>
    <h3>Full Fit</h3>
    <StoryList>{fullFitCards}</StoryList>
  </div>
);
