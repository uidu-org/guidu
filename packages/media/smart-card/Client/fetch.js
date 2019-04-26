import * as tslib_1 from "tslib";
import { Observable } from 'rxjs/Observable';
export default function (method, url, data) {
    return new Observable(function (observer) {
        var AC = new AbortController();
        var requestConfig = tslib_1.__assign({ method: method, signal: AC.signal, credentials: 'include', headers: {
                'Cache-Control': 'no-cache',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            } }, (data ? { body: JSON.stringify(data) } : {}));
        try {
            fetch(url, requestConfig)
                .then(function (resp) { return resp.ok && resp.json(); })
                .then(function (res) {
                observer.next(res);
                observer.complete();
            })
                .catch(function (e) {
                observer.error(e);
            });
        }
        catch (e) {
            observer.error(e);
        }
        return function () { return AC.abort(); };
    });
}
//# sourceMappingURL=fetch.js.map