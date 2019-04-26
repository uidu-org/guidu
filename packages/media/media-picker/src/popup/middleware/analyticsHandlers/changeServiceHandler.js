import * as tslib_1 from "tslib";
import { isChangeServiceAction } from '../../actions/changeService';
import { buttonClickPayload } from '.';
import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
export default (function (action) {
    if (isChangeServiceAction(action)) {
        if (action.serviceName === 'upload') {
            return [
                tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: 'uploadButton' }),
                {
                    name: 'recentFilesBrowserModal',
                    eventType: SCREEN_EVENT_TYPE,
                },
            ];
        }
        else {
            return [
                tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: 'cloudBrowserButton', attributes: {
                        cloudType: action.serviceName,
                    } }),
            ];
        }
    }
});
//# sourceMappingURL=changeServiceHandler.js.map