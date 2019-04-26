import * as tslib_1 from "tslib";
import * as React from 'react';
import Context from '../Context';
import { Client } from '../Client';
var defaultClient = new Client();
var Provider = /** @class */ (function (_super) {
    tslib_1.__extends(Provider, _super);
    function Provider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Provider.prototype.render = function () {
        var _a = this.props, client = _a.client, children = _a.children;
        // Note: the provider is also a consumer which passes through a client from
        // parent context in case a Card is wrapped with multiple Providers.
        return (React.createElement(Context.Consumer, null, function (clientFromParentContext) { return (React.createElement(Context.Provider, { value: client || clientFromParentContext || defaultClient }, children)); }));
    };
    return Provider;
}(React.Component));
export { Provider };
//# sourceMappingURL=index.js.map