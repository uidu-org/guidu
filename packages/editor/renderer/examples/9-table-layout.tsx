import * as React from 'react';
import { default as Renderer } from '../src/ui/Renderer';
import Sidebar from './helper/NavigationNext';
import document from './helper/table-layout.adf.json';

export default function Example() {
  return (
    <Sidebar showSidebar={true}>
      {(additionalProps: object) => (
        <Renderer document={document} {...additionalProps} />
      )}
    </Sidebar>
  );
}
