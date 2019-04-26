import * as tslib_1 from "tslib";
// We still need postis here to communicate with the "link-account-handler" iframe
import * as postis from 'postis';
import * as uuid from 'uuid';
import { mapAuthToQueryParameters } from '../domain/auth';
import { objectToQueryString } from '../tools/objectToQueryString';
import { pickerUrl } from '../tools/fetcher/fetcher';
var CloudService = /** @class */ (function () {
    function CloudService(userAuthProvider) {
        this.userAuthProvider = userAuthProvider;
    }
    CloudService.prototype.startAuth = function (redirectUrl, serviceName) {
        var win = window.open('', '_blank');
        return this.userAuthProvider()
            .then(function (auth) {
            return new Promise(function (resolve) {
                var channelId = uuid.v4();
                var authParams = mapAuthToQueryParameters(auth);
                var queryString = objectToQueryString(tslib_1.__assign({}, authParams, { redirectUrl: redirectUrl + "?channelId=" + channelId }));
                // Electron does not support location.assign so we must use the
                // string setter to assign a new location to the window
                win.location = pickerUrl(auth.baseUrl) + "/service/" + serviceName + "?" + queryString;
                var channel = postis({
                    window: win,
                    scope: channelId,
                });
                channel.ready(function () {
                    channel.listen('auth-callback-received', function () {
                        // notify auth window to close itself
                        channel.send({ method: 'auth-callback-done', params: {} });
                        // unregister the channel listener
                        channel.destroy();
                        resolve();
                        // TODO: MSW-69 what happens if this times out?
                    });
                });
            });
        })
            .catch(function (e) {
            if (win) {
                win.close();
            }
            throw e;
        });
    };
    return CloudService;
}());
export { CloudService };
//# sourceMappingURL=cloud-service.js.map