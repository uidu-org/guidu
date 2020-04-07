import * as React from 'react';
import { ShellBody } from '../../../navigation/shell/src';
import RendererDemo from './helper/RendererDemo';

export default function Example() {
  return (
    <ShellBody scrollable>
      <RendererDemo allowColumnSorting={true} serializer="react" />
    </ShellBody>
  );
}
