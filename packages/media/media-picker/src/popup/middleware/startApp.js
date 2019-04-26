import { isStartAppAction } from '../actions/startApp';
import { updatePopupUrls } from '../actions/updatePopupUrls';
export default function () {
    return function (store) { return function (next) { return function (action) {
        if (isStartAppAction(action)) {
            var redirectUrl = store.getState().redirectUrl;
            store.dispatch(updatePopupUrls({ redirectUrl: redirectUrl }));
        }
        return next(action);
    }; }; };
}
//# sourceMappingURL=startApp.js.map