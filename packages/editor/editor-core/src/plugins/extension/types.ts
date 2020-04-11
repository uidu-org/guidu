import { ExtensionLayout } from '@uidu/adf-schema';
import { ExtensionProvider, UpdateExtension } from '@uidu/editor-common';
import { NodeWithPos } from 'prosemirror-utils';

export type ExtensionState = {
  layout: ExtensionLayout;
  showEditButton: boolean;
  showContextPanel: boolean;
  updateExtension?: UpdateExtension<object>;
  nodeWithPos?: NodeWithPos;
  element?: HTMLElement;
  extensionProvider?: ExtensionProvider;
};

export type ExtensionAction = {
  type: 'UPDATE_STATE';
  data: Partial<ExtensionState>;
};
