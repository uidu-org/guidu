import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isEditorShowImageAction } from '../../actions/editorShowImage';
export default (function (action) {
    if (isEditorShowImageAction(action)) {
        return [
            {
                name: 'fileEditorModal',
                eventType: SCREEN_EVENT_TYPE,
            },
        ];
    }
});
//# sourceMappingURL=editorShowImageHandler.js.map