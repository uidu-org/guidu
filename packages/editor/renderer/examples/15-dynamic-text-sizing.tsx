import * as React from 'react';
import { default as Renderer } from '../src/ui/Renderer';
import { document } from './helper/story-data';

export default function Example() {
  return <Renderer appearance="full-page" document={document} />;
}
