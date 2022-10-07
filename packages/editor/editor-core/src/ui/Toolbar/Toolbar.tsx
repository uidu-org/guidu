import React from 'react';
import { ToolbarProps } from './toolbar-types';
import { ToolbarInner } from './ToolbarInner';
import { ToolbarSize } from './types';

export function Toolbar({
  items,
  editorView,
  editorActions,
  eventDispatcher,
  providerFactory,
  popupsMountPoint,
  popupsBoundariesElement,
  popupsScrollableElement,
  appearance,
  disabled,
  dispatchAnalyticsEvent,
  toolbarSize,
}: ToolbarProps) {
  return (
    <ToolbarInner
      items={items}
      editorView={editorView}
      editorActions={editorActions}
      eventDispatcher={eventDispatcher}
      providerFactory={providerFactory}
      appearance={appearance}
      popupsMountPoint={popupsMountPoint}
      popupsBoundariesElement={popupsBoundariesElement}
      popupsScrollableElement={popupsScrollableElement}
      disabled={disabled}
      dispatchAnalyticsEvent={dispatchAnalyticsEvent}
      toolbarSize={toolbarSize}
      isToolbarReducedSpacing={toolbarSize < ToolbarSize.XXL}
    />
  );
}

export default Toolbar;
