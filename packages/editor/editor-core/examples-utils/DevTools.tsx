import applyDevTools from 'prosemirror-dev-tools';
import React from 'react';
import { WithEditorActions } from '../src';

export function DevTools() {
  return (
    <WithEditorActions
      render={(actions) => {
        const editorView = actions._privateGetEditorView();
        if (editorView) {
          applyDevTools(editorView);
        }
        return null;
      }}
    />
  );
}
