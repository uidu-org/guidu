import * as React from 'react';
import { Card } from '../src';
import {
  createStorybookContext,
  videoFileId,
  imageFileId,
  videoLargeFileId,
  videoHorizontalFileId,
} from '@uidu/media-test-helpers';
import {
  InlineCardVideoWrapper,
  InlineCardVideoWrapperItem,
} from '../example-helpers/styled';

const context = createStorybookContext();
const onClick = () => console.log('onClick');

export default () => (
  <InlineCardVideoWrapper>
    <InlineCardVideoWrapperItem>
      <h1>video large [disableOverlay=true] width=500 height=300</h1>
      <Card
        context={context}
        identifier={videoLargeFileId}
        dimensions={{ width: 500, height: 300 }}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>

    <InlineCardVideoWrapperItem>
      <h1>
        video large [disableOverlay=true] width=500 height=300 (but with
        constraining box of 250px x auto)
      </h1>
      <div style={{ width: '250px', height: 'auto' }}>
        <Card
          context={context}
          identifier={videoLargeFileId}
          dimensions={{ width: 500, height: 300 }}
          disableOverlay={true}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </div>
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>Image file [disableOverlay=true]</h1>
      <Card
        context={context}
        identifier={imageFileId}
        disableOverlay={true}
        onClick={onClick}
      />
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>Image file [disableOverlay=true] [useInlinePlayer=true]</h1>
      <Card
        context={context}
        identifier={imageFileId}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>video [disableOverlay=true] no dimensions</h1>
      <Card
        context={context}
        identifier={videoFileId}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>video [disableOverlay=true] width=100% height=300</h1>
      <Card
        context={context}
        identifier={videoFileId}
        dimensions={{ width: '100%', height: 300 }}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>video horizontal [disableOverlay=true] width=500 height=300</h1>
      <Card
        context={context}
        identifier={videoHorizontalFileId}
        dimensions={{ width: 500, height: 300 }}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>video horizontal width=200 height=500</h1>
      <Card
        context={context}
        identifier={videoHorizontalFileId}
        dimensions={{ width: 200, height: 500 }}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>
    <InlineCardVideoWrapperItem>
      <h1>video horizontal no dimensions</h1>
      <Card
        context={context}
        identifier={videoHorizontalFileId}
        onClick={onClick}
        useInlinePlayer={true}
      />
    </InlineCardVideoWrapperItem>
  </InlineCardVideoWrapper>
);
