import { Action } from 'redux';

import { isFileUploadEndAction } from '../actions/fileUploadEnd';
import { State } from '../domain';

export default function fileUploadEnd(state: State, action: Action): State {
  if (isFileUploadEndAction(action)) {
    const uploads = { ...state.uploads };
    if (uploads[action.file.id]) {
      uploads[action.file.id].progress = null; // clearing progress will remove progress UI
      uploads[action.file.id].events.push(action.originalEvent);
    }
    return { ...state, ...{ uploads } };
  } else {
    return state;
  }
}
