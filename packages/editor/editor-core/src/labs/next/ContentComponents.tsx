import * as React from 'react';
import PluginSlot from '../../ui/PluginSlot';
import { EditorSharedConfigConsumer } from './Editor';

export function ContentComponents() {
  return (
    <EditorSharedConfigConsumer>
      {config => {
        return !config ? null : (
          <PluginSlot
            editorView={config.editorView}
            eventDispatcher={config.eventDispatcher}
            providerFactory={config.providerFactory}
            items={config.contentComponents}
            popupsMountPoint={config.popupsMountPoint}
            popupsBoundariesElement={config.popupsBoundariesElement}
            popupsScrollableElement={config.popupsScrollableElement}
            disabled={config.disabled || false}
            containerElement={undefined}
          />
        );
      }}
    </EditorSharedConfigConsumer>
  );
}
