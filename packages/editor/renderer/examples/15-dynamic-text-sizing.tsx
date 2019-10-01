import { ProviderFactory } from '@uidu/editor-common';
import * as React from 'react';
import { default as Renderer } from '../src/ui/Renderer';
import { document } from './helper/story-data';

export default function Example() {
  return (
    <Renderer
      appearance="full-page"
      allowDynamicTextSizing
      document={document}
    />
  );
}
