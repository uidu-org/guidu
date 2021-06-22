import * as React from 'react';
import { ScrollableContainer } from '../../../navigation/shell/src';
import RendererDemo from './helper/RendererDemo';

export default function Example() {
  return (
    <ScrollableContainer>
      <RendererDemo allowColumnSorting={true} serializer="react" />
    </ScrollableContainer>
  );
}
