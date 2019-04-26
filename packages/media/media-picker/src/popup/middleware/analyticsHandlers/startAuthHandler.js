import * as tslib_1 from "tslib";
import { isStartAuthAction } from '../../actions/startAuth';
import { buttonClickPayload } from '.';
export default (function (action) {
    if (isStartAuthAction(action)) {
        return [
            tslib_1.__assign({}, buttonClickPayload, { actionSubjectId: 'linkCloudAccountButton', attributes: {
                    cloudType: action.serviceName,
                } }),
        ];
    }
});
//# sourceMappingURL=startAuthHandler.js.map