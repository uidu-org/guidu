import { EditorState } from 'prosemirror-state';
import { typeAheadPluginKey } from '..';

export const isTypeAheadOpen = (editorState: EditorState) => {
  return (
    typeAheadPluginKey?.getState(editorState)?.decorationSet?.find().length > 0
  );
};
