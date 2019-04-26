import * as tslib_1 from "tslib";
import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { buttonClickPayload } from '.';
import { isStartFileBrowserAction } from '../../actions/startFileBrowser';
export default (function (action) {
    if (isStartFileBrowserAction(action)) {
        return [
            {
                name: 'localFileBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
            },
            tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: 'localFileBrowserButton' }),
        ];
    }
});
//# sourceMappingURL=startFileBrowserHandler.js.map