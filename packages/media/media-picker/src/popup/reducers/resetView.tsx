import { Action } from 'redux';

import { isResetViewAction } from '../actions';
import { State, SelectedItem, LocalUploads } from '../domain';

export default function resetView(state: State, action: Action): State {
  if (isResetViewAction(action)) {
    const selectedItems: SelectedItem[] = [];

    const oldUploads = state.uploads;
    const uploads = Object.keys(oldUploads)
      .filter(uploadId => {
        const progress = oldUploads[uploadId].progress;
        return typeof progress === 'number' && progress < 1; // remove files that finished upload
      })
      .reduce<LocalUploads>((uploads, fileIdToKeep) => {
        uploads[fileIdToKeep] = oldUploads[fileIdToKeep];
        return uploads;
      }, {});

    return {
      ...state,
      selectedItems,
      uploads,
    };
  } else {
    return state;
  }
}
