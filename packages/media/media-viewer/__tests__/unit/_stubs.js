import * as events from 'events';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
var Stubs = /** @class */ (function () {
    function Stubs() {
    }
    Stubs.mediaViewer = function (overrides) {
        var noop = function () { };
        var emitter = new events.EventEmitter();
        var mediaViewer = {
            on: noop,
            off: noop,
            trigger: function (event) { return emitter.emit(event); },
            isOpen: jest.fn(),
            open: overrides.open || jest.fn(),
            setFiles: overrides.setFiles || jest.fn(),
            getCurrent: jest.fn(),
            isShowingLastFile: jest.fn(),
        };
        jest
            .spyOn(mediaViewer, 'on')
            .mockImplementation(function (event, callback) { return emitter.on(event, callback); });
        jest
            .spyOn(mediaViewer, 'off')
            .mockImplementation(function (event, callback) {
            return emitter.removeListener(event, callback);
        });
        return mediaViewer;
    };
    Stubs.mediaViewerConstructor = function (overrides) {
        return jest.fn(function () { return Stubs.mediaViewer(overrides || {}); });
    };
    Stubs.mediaItemProvider = function (subject) {
        return {
            observable: jest.fn(function () { return subject || new Subject(); }),
        };
    };
    Stubs.context = function (config, getFileState) {
        return {
            config: config,
            file: {
                downloadBinary: jest.fn(),
                getFileState: jest.fn(getFileState || (function () { return Observable.empty(); })),
                upload: jest.fn(),
            },
            collection: {
                getItems: jest.fn(function () { return Observable.empty(); }),
                loadNextPage: jest.fn(),
            },
        };
    };
    return Stubs;
}());
export { Stubs };
export var createContext = function (options) {
    var defaultOptions = {
        authPromise: Promise.resolve({
            token: 'some-token',
            clientId: 'some-client-id',
            baseUrl: 'some-service-host',
        }),
        getFileState: undefined,
        config: undefined,
    };
    var _a = options || defaultOptions, authPromise = _a.authPromise, getFileState = _a.getFileState, config = _a.config;
    var authProvider = jest.fn(function () { return authPromise; });
    var contextConfig = {
        authProvider: authProvider,
    };
    return Stubs.context(config || contextConfig, getFileState);
};
//# sourceMappingURL=_stubs.js.map