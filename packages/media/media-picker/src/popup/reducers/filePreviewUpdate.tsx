import { Action } from 'redux';

import { isFileUploadPreviewUpdateAction } from '../actions/fileUploadPreviewUpdate';
import { State } from '../domain';

export default function filePreviewUpdate(state: State, action: Action): State {
  if (isFileUploadPreviewUpdateAction(action)) {
    // this event is not going to be recorded or sent to main window (you can't pass blobs)
    const uploads = { ...state.uploads };
    if (uploads[action.file.id]) {
      uploads[action.file.id].file.blob = action.preview;
      uploads[action.file.id].events.push(action.originalEvent);
    }
    return { ...state, ...{ uploads } };
  } else {
    return state;
  }
}
