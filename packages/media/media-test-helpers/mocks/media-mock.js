import { Server } from 'kakapo';
import * as exenv from 'exenv';
import { createApiRouter, createMediaPlaygroundRouter } from './routers';
import { createDatabase, generateUserData, generateTenantData, } from './database';
var MediaMock = /** @class */ (function () {
    function MediaMock(collection) {
        this.server = new Server();
        this.collection = collection;
    }
    MediaMock.prototype.enable = function () {
        if (!exenv.canUseDOM) {
            return;
        }
        this.server.use(createDatabase());
        this.server.use(createMediaPlaygroundRouter());
        this.server.use(createApiRouter());
        generateUserData(this.collection);
        generateTenantData();
    };
    MediaMock.prototype.disable = function () {
        // TODO: add teardown logic to kakapo server
        // tslint:disable:no-console
        console.warn('Disabling logic is not implemented in MediaMock');
    };
    return MediaMock;
}());
export { MediaMock };
export var mediaMock = new MediaMock();
//# sourceMappingURL=media-mock.js.map