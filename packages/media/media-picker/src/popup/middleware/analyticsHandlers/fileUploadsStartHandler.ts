import { Action } from 'redux';
import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isFileUploadsStartAction } from '../../actions/fileUploadsStart';
import { HandlerResult, Payload } from '.';
import { MediaFile } from '../../../domain/file';

export default (action: Action): HandlerResult => {
  if (isFileUploadsStartAction(action)) {
    return action.files.map(
      (file: MediaFile) =>
        <Payload>{
          action: 'commenced',
          actionSubject: 'mediaUpload',
          actionSubjectId: 'localMedia',
          attributes: {
            fileAttributes: {
              fileSize: file.size,
              fileMimetype: file.type,
              fileSource: 'mediapicker',
            },
          },
          eventType: OPERATIONAL_EVENT_TYPE,
        },
    );
  }
};
