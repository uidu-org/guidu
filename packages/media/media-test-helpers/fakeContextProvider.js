import * as tslib_1 from "tslib";
import { of } from 'rxjs/observable/of';
var getDefaultContextConfig = function () { return ({
    authProvider: jest.fn().mockReturnValue(function () {
        return Promise.resolve({
            clientId: 'some-client-id',
            token: 'some-token',
            baseUrl: 'some-service-host',
        });
    }),
}); };
export var fakeContext = function (stubbedContext, config) {
    if (stubbedContext === void 0) { stubbedContext = {}; }
    if (config === void 0) { config = getDefaultContextConfig(); }
    var returns = function (value) { return jest.fn().mockReturnValue(value); };
    var getFile = jest.fn().mockReturnValue(of({}));
    var collection = {
        getItems: returns(of([])),
        loadNextPage: jest.fn(),
    };
    var getImage = jest.fn();
    var getImageUrl = jest.fn().mockResolvedValue('some-image-url');
    var getImageMetadata = jest.fn();
    var touchFiles = jest.fn();
    var downloadBinary = jest.fn();
    var file = {
        getFileState: getFile,
        downloadBinary: downloadBinary,
        upload: jest.fn(),
        getArtifactURL: jest.fn(),
        touchFiles: touchFiles,
        getCurrentState: jest.fn(),
    };
    var defaultContext = {
        getImageMetadata: getImageMetadata,
        getImage: getImage,
        getImageUrl: getImageUrl,
        config: config,
        collection: collection,
        file: file,
    };
    var wrappedStubbedContext = {};
    Object.keys(stubbedContext).forEach(function (methodName) {
        wrappedStubbedContext[methodName] = returns(stubbedContext[methodName]);
    });
    if (stubbedContext.file) {
        Object.keys(stubbedContext.file).forEach(function (methodName) {
            wrappedStubbedContext.file[methodName] = returns(stubbedContext.file[methodName]);
        });
    }
    if (stubbedContext.collection) {
        Object.keys(stubbedContext.collection).forEach(function (methodName) {
            wrappedStubbedContext.collection[methodName] = returns(stubbedContext.collection[methodName]);
        });
    }
    if (stubbedContext.context) {
        Object.keys(stubbedContext.context).forEach(function (methodName) {
            wrappedStubbedContext.context[methodName] = returns(stubbedContext.context[methodName]);
        });
    }
    return tslib_1.__assign({}, defaultContext, wrappedStubbedContext);
};
//# sourceMappingURL=fakeContextProvider.js.map