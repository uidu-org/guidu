import { EditorState } from 'prosemirror-state';
import React from 'react';

export type ContextPanelHandler = (state: EditorState) => React.ReactNode;
