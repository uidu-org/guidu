import { isClientBasedAuth } from '@uidu/media-core';
import { WsConnectionHolder } from './wsConnectionHolder';
// Helper class that provides a WsConnectionHolder instance for a given client.
var WsProvider = /** @class */ (function () {
    function WsProvider() {
        this.connectionHolders = {};
    }
    WsProvider.prototype.getWsConnectionHolder = function (auth) {
        var tag = WsProvider.mapAuthToTag(auth);
        var stored = this.connectionHolders[tag];
        if (stored) {
            return stored;
        }
        return this.createAndRemember(auth, tag);
    };
    WsProvider.prototype.createAndRemember = function (auth, tag) {
        var holder = new WsConnectionHolder(auth);
        this.connectionHolders[tag] = holder;
        return holder;
    };
    WsProvider.mapAuthToTag = function (auth) {
        if (isClientBasedAuth(auth)) {
            return auth.clientId + "-" + auth.token;
        }
        else {
            return auth.asapIssuer + "-" + auth.token;
        }
    };
    return WsProvider;
}());
export { WsProvider };
//# sourceMappingURL=wsProvider.js.map