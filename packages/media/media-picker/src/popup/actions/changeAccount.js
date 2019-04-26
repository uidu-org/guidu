export var CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
export function isChangeAccountAction(action) {
    return action.type === CHANGE_ACCOUNT;
}
export function changeAccount(serviceName, accountId) {
    return {
        type: CHANGE_ACCOUNT,
        serviceName: serviceName,
        accountId: accountId,
    };
}
//# sourceMappingURL=changeAccount.js.map