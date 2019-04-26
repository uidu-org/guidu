import { isFileListUpdateAction } from '../../actions/fileListUpdate';
import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
export default (function (action) {
    if (isFileListUpdateAction(action)) {
        return [
            {
                name: 'cloudBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
                attributes: {
                    cloudType: action.serviceName,
                },
            },
        ];
    }
});
//# sourceMappingURL=fileListUpdateHandler.js.map