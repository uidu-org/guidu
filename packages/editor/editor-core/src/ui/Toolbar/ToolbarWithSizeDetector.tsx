import { WidthObserver } from '@uidu/editor-common';
import React from 'react';
import { Toolbar } from './Toolbar';
import { widthToToolbarSize } from './toolbar-size';
import { ToolbarWithSizeDetectorProps } from './toolbar-types';

export const ToolbarWithSizeDetector: React.FunctionComponent<ToolbarWithSizeDetectorProps> = (
  props,
) => {
  const [width, setWidth] = React.useState<number | undefined>(undefined);
  const toolbarSize = widthToToolbarSize(width || 0, props.appearance);

  return (
    <div style={{ width: '100%', minWidth: '254px', position: 'relative' }}>
      <WidthObserver setWidth={setWidth} />
      {width === undefined ? null : (
        <Toolbar {...props} toolbarSize={toolbarSize} />
      )}
    </div>
  );
};
