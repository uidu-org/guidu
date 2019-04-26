import { isHidePopupAction } from '../actions/hidePopup';
export default (function (eventEmitter) { return function (_) { return function (next) { return function (action) {
    if (isHidePopupAction(action)) {
        eventEmitter.emitClosed();
    }
    return next(action);
}; }; }; });
//# sourceMappingURL=hidePopup.js.map