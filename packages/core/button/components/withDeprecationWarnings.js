var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var getComponentName = function (target) {
    if (target.displayName && typeof target.displayName === 'string') {
        return target.displayName;
    }
    return target.name || 'Component';
};
var warnIfDeprecatedAppearance = function (appearance) {
    var deprecatedAppearances = ['help'];
    if (appearance && deprecatedAppearances.indexOf(appearance) !== -1) {
        // tslint:disable-next-line:no-console
        console.warn("Atlaskit: The Button appearance \"" + appearance + "\" is deprecated. Please use styled-components' ThemeProvider to provide a custom theme for Button instead.");
    }
};
var withDeprecationWarnings = function (Component) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(WithDeprecationWarnings, _super);
            function WithDeprecationWarnings() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WithDeprecationWarnings.prototype.componentWillMount = function () {
                warnIfDeprecatedAppearance(this.props.appearance);
            };
            WithDeprecationWarnings.prototype.componentWillReceiveProps = function (newProps) {
                if (newProps.appearance !== this.props.appearance) {
                    warnIfDeprecatedAppearance(newProps.appearance);
                }
            };
            WithDeprecationWarnings.prototype.render = function () {
                return React.createElement(Component, this.props);
            };
            return WithDeprecationWarnings;
        }(React.Component)),
        _a.displayName = "WithDeprecationWarnings(" + getComponentName(Component) + ")",
        _a;
};
export default withDeprecationWarnings;
//# sourceMappingURL=withDeprecationWarnings.js.map