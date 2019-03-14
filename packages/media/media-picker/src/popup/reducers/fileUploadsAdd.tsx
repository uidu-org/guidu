import { Action } from 'redux';

import { isFileUploadsStartAction } from '../actions/fileUploadsStart';
import { LocalUpload, State, SelectedItem } from '../domain';

export default function fileUploadsAdd(state: State, action: Action): State {
  if (isFileUploadsStartAction(action)) {
    const { uploads, selectedItems, lastUploadIndex } = state;

    const files = action.files;
    const newUploads: { [id: string]: LocalUpload } = {};

    let newLastUploadIndex = lastUploadIndex;
    files.forEach(
      ({
        id,
        name,
        type,
        size,
        upfrontId,
        userUpfrontId,
        userOccurrenceKey,
        occurrenceKey,
      }) => {
        if (userUpfrontId && userOccurrenceKey) {
          newUploads[id] = {
            file: {
              metadata: {
                id,
                name,
                mimeType: type,
                size,
                upfrontId,
                userUpfrontId,
                userOccurrenceKey,
                occurrenceKey,
              },
            },
            timeStarted: Date.now(),
            progress: 0,
            events: [], // uploads-start is not part of events. It will be emitted manually in importFiles.tsx
            index: newLastUploadIndex++, // this index helps to sort upload items, so that latest come first
          };
        }
      },
    );

    const newSelectedItems: SelectedItem[] = files.map(
      ({ id, name, type, size, upfrontId, occurrenceKey }) =>
        ({
          date: 0,
          id,
          upfrontId,
          occurrenceKey,
          mimeType: type,
          name,
          parentId: '',
          size,
          serviceName: 'upload',
        } as SelectedItem),
    );

    return {
      ...state,
      uploads: {
        ...uploads,
        ...newUploads,
      },
      selectedItems: [...selectedItems, ...newSelectedItems],
      lastUploadIndex: newLastUploadIndex,
    };
  } else {
    return state;
  }
}
