import * as tslib_1 from "tslib";
import { SET_UPFRONT_ID_DEFERRED, } from '../actions/setUpfrontIdDeferred';
export default function setUpfrontIdDeferred(state, action) {
    var _a;
    if (action.type === SET_UPFRONT_ID_DEFERRED) {
        var id = action.id, resolver = action.resolver, rejecter = action.rejecter;
        return tslib_1.__assign({}, state, { deferredIdUpfronts: tslib_1.__assign({}, state.deferredIdUpfronts, (_a = {}, _a[id] = { resolver: resolver, rejecter: rejecter }, _a)) });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=setUpfrontIdDeferred.js.map