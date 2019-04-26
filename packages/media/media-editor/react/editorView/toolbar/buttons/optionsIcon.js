import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import MediaServicesButtonOptionIcon from '@atlaskit/icon/glyph/media-services/button-option';
import { OptionsIconWrapper } from './styles';
// Small triangle in the right bottom corner of the buttons for color and line width
var OptionsIcon = /** @class */ (function (_super) {
    tslib_1.__extends(OptionsIcon, _super);
    function OptionsIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OptionsIcon.prototype.render = function () {
        var isActive = this.props.isActive;
        return (React.createElement(OptionsIconWrapper, { isActive: isActive },
            React.createElement(MediaServicesButtonOptionIcon, { label: "options" })));
    };
    return OptionsIcon;
}(Component));
export { OptionsIcon };
//# sourceMappingURL=optionsIcon.js.map