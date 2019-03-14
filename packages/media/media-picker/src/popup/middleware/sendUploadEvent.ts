import { Dispatch, Middleware } from 'redux';

import { PopupUploadEventEmitter } from '../../components/types';
import { State } from '../domain';
import { isSendUploadEventAction } from '../actions/sendUploadEvent';
import { copyMediaFileForUpload } from '../../domain/file';
import { handleError } from '../../util/handleError';

export default function(eventEmitter: PopupUploadEventEmitter): Middleware {
  return () => (next: Dispatch<State>) => action => {
    if (isSendUploadEventAction(action)) {
      const { event, uploadId } = action.payload;

      switch (event.name) {
        case 'upload-status-update': {
          const file = copyMediaFileForUpload(event.data.file, uploadId);
          eventEmitter.emitUploadProgress(file, event.data.progress);
          break;
        }
        case 'upload-preview-update': {
          const { preview } = event.data;
          const file = copyMediaFileForUpload(event.data.file, uploadId);
          eventEmitter.emitUploadPreviewUpdate(file, preview);
          break;
        }
        case 'upload-processing': {
          const file = copyMediaFileForUpload(event.data.file, uploadId);
          eventEmitter.emitUploadProcessing(file);
          break;
        }
        case 'upload-end': {
          const file = copyMediaFileForUpload(event.data.file, uploadId);
          eventEmitter.emitUploadEnd(file, event.data.public);
          break;
        }
        case 'upload-error': {
          const file = copyMediaFileForUpload(event.data.file, uploadId);
          const { error } = event.data;
          eventEmitter.emitUploadError(file, error);
          handleError(error.name, error.description);
          break;
        }
      }
    }
    return next(action);
  };
}
