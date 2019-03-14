import { Action, MiddlewareAPI } from 'redux';
import { TRACK_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { State } from '../../domain';
import { isFileUploadEndAction } from '../../actions/fileUploadEnd';
import { HandlerResult } from '.';

export default (action: Action, store: MiddlewareAPI<State>): HandlerResult => {
  if (isFileUploadEndAction(action)) {
    const { file, publicFile } = action;

    const timeStarted = store.getState().uploads[file.id].timeStarted;

    return [
      {
        action: 'uploaded',
        actionSubject: 'mediaUpload',
        actionSubjectId: 'localMedia',
        attributes: {
          fileAttributes: {
            fileMediatype: publicFile.mediaType,
            fileState: publicFile.processingStatus,
            fileStatus:
              publicFile.artifacts &&
              Object.keys(publicFile.artifacts).length > 0
                ? 'original'
                : 'converted',
            fileSize: publicFile.size,
            fileMimetype: publicFile.mimeType,
            fileSource: 'mediapicker',
          },
          status: 'success',
          uploadDurationMsec:
            timeStarted !== undefined ? Date.now() - timeStarted : -1,
        },
        eventType: TRACK_EVENT_TYPE,
      },
    ];
  }
};
