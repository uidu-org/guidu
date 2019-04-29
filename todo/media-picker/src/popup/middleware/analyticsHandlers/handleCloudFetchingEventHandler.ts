import {
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { Action, MiddlewareAPI } from 'redux';
import { State } from '../../domain';
import { isHandleCloudFetchingEventAction } from '../../actions/handleCloudFetchingEvent';
import { MediaFile } from '../../../domain/file';
import { HandlerResult } from '.';

const commonPayload = {
  actionSubject: 'mediaUpload',
  actionSubjectId: 'cloudMedia',
};

const fileAttributes = (file: MediaFile) => ({
  fileSize: file.size,
  fileMimetype: file.type,
  fileSource: 'mediapicker',
});

export default (action: Action, store: MiddlewareAPI<State>): HandlerResult => {
  if (isHandleCloudFetchingEventAction(action)) {
    const { event, payload, file } = action;
    const remoteUpload = store.getState().remoteUploads[payload.uploadId];
    const { timeStarted } = remoteUpload || { timeStarted: undefined };
    const uploadDurationMsec =
      timeStarted !== undefined ? Date.now() - timeStarted : -1;
    if (event === 'RemoteUploadStart') {
      return [
        {
          action: 'commenced',
          ...commonPayload,
          attributes: {
            fileAttributes: fileAttributes(file),
          },
          eventType: OPERATIONAL_EVENT_TYPE,
        },
      ];
    } else if (event === 'RemoteUploadEnd') {
      return [
        {
          action: 'uploaded',
          ...commonPayload,
          attributes: {
            fileAttributes: fileAttributes(file),
            status: 'success',
            uploadDurationMsec,
          },
          eventType: TRACK_EVENT_TYPE,
        },
      ];
    } else if (event === 'RemoteUploadFail') {
      return [
        {
          action: 'uploaded',
          ...commonPayload,
          attributes: {
            fileAttributes: fileAttributes(file),
            status: 'fail',
            uploadDurationMsec,
          },
          eventType: TRACK_EVENT_TYPE,
        },
      ];
    } else {
      return [];
    }
  }
};
