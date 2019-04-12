import { StoryBookAuthProvider } from './authProvider';
import { collectionNames } from './collectionNames';
import { ContextFactory } from '@uidu/media-core';
import { mediaPickerAuthProvider } from './mediaPickerAuthProvider';
import { userAuthProvider } from './userAuthProvider';
export var defaultBaseUrl = 'https://dt-api.dev.atl-paas.net';
export var defaultParams = {
    clientId: '5a9812fc-d029-4a39-8a46-d3cc36eed7ab',
    asapIssuer: 'micros/media-playground',
    baseUrl: defaultBaseUrl,
};
var defaultAuthParameter = {
    authType: 'client',
};
/**
 * Creates and returns `Context` (from `media-core`) based on the data provided in parameter object.
 *
 * @param {AuthParameter} authParameter specifies serviceName and whatever auth should be done with clientId or asapIssuer
 * @returns {Context}
 */
export var createStorybookContext = function (authParameter) {
    if (authParameter === void 0) { authParameter = defaultAuthParameter; }
    var scopes = {
        'urn:filestore:file:*': ['read'],
        'urn:filestore:chunk:*': ['read'],
    };
    collectionNames.forEach(function (c) {
        scopes["urn:filestore:collection:" + c] = ['read', 'update'];
    });
    var isAsapEnvironment = authParameter.authType === 'asap';
    var authProvider = StoryBookAuthProvider.create(isAsapEnvironment, scopes);
    return ContextFactory.create({
        authProvider: authProvider,
    });
};
export var createUploadContext = function () {
    return ContextFactory.create({
        authProvider: mediaPickerAuthProvider('asap'),
        userAuthProvider: userAuthProvider,
    });
};
//# sourceMappingURL=contextProvider.js.map