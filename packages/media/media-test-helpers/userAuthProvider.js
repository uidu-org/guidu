import * as exenv from 'exenv';
import { ContextFactory } from '@uidu/media-core';
export var userAuthProviderBaseURL = 'https://dt-api.dev.atl-paas.net';
var userAuthProviderPromiseCache;
export var userAuthProvider = function () {
    if (!exenv.canUseDOM) {
        return Promise.resolve({
            clientId: '',
            token: '',
            baseUrl: '',
        });
    }
    if (userAuthProviderPromiseCache) {
        return userAuthProviderPromiseCache;
    }
    var url = 'https://uidu.local:8443/media-playground/api/token/user/impersonation';
    userAuthProviderPromiseCache = fetch(url, {
        method: 'GET',
        credentials: 'include',
    }).then(function (response) {
        // We leverage the fact, that our internal /toke/tenant API returns data in the same format as Auth
        return response.json();
    });
    return userAuthProviderPromiseCache;
};
export var createUserContext = function () {
    return ContextFactory.create({
        authProvider: userAuthProvider,
    });
};
//# sourceMappingURL=userAuthProvider.js.map