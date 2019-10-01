import { ProviderFactory } from '@uidu/editor-common';
import * as React from 'react';
// import { storyMediaProviderFactory } from '@uidu/editor-test-helpers';
import { default as Renderer } from '../src/ui/Renderer';
import document from './helper/media-layout.adf.json';

export default function Example() {
  return (
    <Renderer
      document={document}
      appearance="full-page"
    />
  );
}
