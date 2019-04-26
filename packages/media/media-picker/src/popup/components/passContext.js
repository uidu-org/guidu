import * as tslib_1 from "tslib";
import { Component } from 'react';
import { intlShape, IntlProvider } from 'react-intl';
var PassContext = /** @class */ (function (_super) {
    tslib_1.__extends(PassContext, _super);
    function PassContext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createDefaultI18nProvider = function () {
            return new IntlProvider({ locale: 'en' }).getChildContext().intl;
        };
        return _this;
    }
    PassContext.prototype.getChildContext = function () {
        var _a = this.props, store = _a.store, proxyReactContext = _a.proxyReactContext;
        var getAtlaskitAnalyticsEventHandlers = proxyReactContext && proxyReactContext.getAtlaskitAnalyticsEventHandlers
            ? proxyReactContext.getAtlaskitAnalyticsEventHandlers
            : function () { return []; };
        var intl = (proxyReactContext && proxyReactContext.intl) ||
            this.createDefaultI18nProvider();
        return {
            store: store,
            getAtlaskitAnalyticsEventHandlers: getAtlaskitAnalyticsEventHandlers,
            intl: intl,
        };
    };
    PassContext.prototype.render = function () {
        var children = this.props.children;
        return children;
    };
    // We need to manually specify all the child contexts
    PassContext.childContextTypes = {
        store: function () { },
        getAtlaskitAnalyticsEventHandlers: function () { },
        intl: intlShape,
    };
    return PassContext;
}(Component));
export default PassContext;
//# sourceMappingURL=passContext.js.map