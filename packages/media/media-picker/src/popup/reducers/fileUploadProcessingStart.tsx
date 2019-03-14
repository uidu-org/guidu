import { Action } from 'redux';

import { isFileUploadProcessingStartAction } from '../actions/fileUploadProcessingStart';
import { State } from '../domain';

export default function fileUploadProcessingStart(
  state: State,
  action: Action,
): State {
  if (isFileUploadProcessingStartAction(action)) {
    const uploads = { ...state.uploads };
    if (uploads[action.file.id]) {
      uploads[action.file.id].progress = 1; // no specific UI, just setting 100% in progress
      uploads[action.file.id].events.push(action.originalEvent);
    }
    return { ...state, ...{ uploads } };
  } else {
    return state;
  }
}
