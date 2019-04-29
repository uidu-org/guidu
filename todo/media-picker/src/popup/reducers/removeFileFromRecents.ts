import { Action } from 'redux';

import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
import { State } from '../domain';

export default function removeFileFromRecents(
  state: State,
  action: Action,
): State {
  if (isRemoveFileFromRecentsAction(action)) {
    const selectedItems = state.selectedItems.filter(
      item => item.id !== action.id,
    );

    const uploadIdsToDelete = Object.keys(state.uploads).filter(
      uploadId => state.uploads[uploadId].file.metadata.id === action.id,
    );
    const uploads = { ...state.uploads };
    uploadIdsToDelete.forEach(uploadId => {
      delete uploads[uploadId];
    });

    return {
      ...state,
      selectedItems,
      uploads,
    };
  } else {
    return state;
  }
}
