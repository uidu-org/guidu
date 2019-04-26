import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isFileUploadsStartAction } from '../../actions/fileUploadsStart';
export default (function (action) {
    if (isFileUploadsStartAction(action)) {
        return action.files.map(function (file) {
            return ({
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
            });
        });
    }
});
//# sourceMappingURL=fileUploadsStartHandler.js.map