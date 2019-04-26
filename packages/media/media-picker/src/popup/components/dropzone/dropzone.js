import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { Wrapper, Content, Label, Glass } from './styled';
import { UploadIcon } from './icons';
var Dropzone = /** @class */ (function (_super) {
    tslib_1.__extends(Dropzone, _super);
    function Dropzone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dropzone.prototype.render = function () {
        var isActive = this.props.isActive;
        return (React.createElement(Wrapper, { isActive: isActive },
            React.createElement(Content, null,
                React.createElement(UploadIcon, null),
                React.createElement(Label, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.drop_your_files)))),
            React.createElement(Glass, null)));
    };
    return Dropzone;
}(Component));
export { Dropzone };
//# sourceMappingURL=dropzone.js.map