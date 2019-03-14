import { Action, MiddlewareAPI } from 'redux';
import { TRACK_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { State } from '../../domain';
import { isFileUploadErrorAction } from '../../actions/fileUploadError';
import { HandlerResult } from '.';

export default (action: Action, store: MiddlewareAPI<State>): HandlerResult => {
  if (isFileUploadErrorAction(action)) {
    const uploadFile = action.file;
    const currentUploads = store.getState().uploads;

    const timeStarted = currentUploads[uploadFile.id].timeStarted;

    return [
      {
        action: 'uploaded',
        actionSubject: 'mediaUpload',
        actionSubjectId: 'localMedia',
        attributes: {
          fileAttributes: {
            fileSize: uploadFile.size,
            fileSource: 'mediapicker',
          },
          status: 'fail',
          failReason: action.error.description,
          uploadDurationMsec:
            timeStarted !== undefined ? Date.now() - timeStarted : -1,
        },
        eventType: TRACK_EVENT_TYPE,
      },
    ];
  }
};
