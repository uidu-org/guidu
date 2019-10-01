import * as React from 'react';
import ToolBar from '../../ui/Toolbar';
import { EditorSharedConfigConsumer } from './Editor';

export function Toolbar() {
  return (
    <EditorSharedConfigConsumer>
      {config => {
        return !config ? null : (
          <ToolBar
            editorView={config.editorView}
            eventDispatcher={config.eventDispatcher!}
            providerFactory={config.providerFactory}
            items={config.primaryToolbarComponents}
            popupsMountPoint={config.popupsMountPoint}
            popupsBoundariesElement={config.popupsBoundariesElement}
            popupsScrollableElement={config.popupsScrollableElement}
            disabled={config.disabled || false}
          />
        );
      }}
    </EditorSharedConfigConsumer>
  );
}
