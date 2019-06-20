import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

// import {
//   stateKey as mediaStateKey,
//   MediaPluginState,
// } from '../plugins/media/pm-plugins/main';

export async function getEditorValueWithMedia(
  editorView?: EditorView,
): Promise<Node | undefined> {
  if (!editorView) {
    return undefined;
  }

  const { state } = editorView;

  // const mediaPluginState =
  //   state && (mediaStateKey.getState(state) as MediaPluginState);

  // if (mediaPluginState && mediaPluginState.waitForMediaUpload) {
  //   await mediaPluginState.waitForPendingTasks();
  // }

  return editorView.state.doc;
}
