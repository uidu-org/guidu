export var CHANGE_SERVICE = 'SERVICE_CHANGE';
export function isChangeServiceAction(action) {
    return action.type === CHANGE_SERVICE;
}
export function changeService(serviceName) {
    return {
        type: CHANGE_SERVICE,
        serviceName: serviceName,
    };
}
//# sourceMappingURL=changeService.js.map