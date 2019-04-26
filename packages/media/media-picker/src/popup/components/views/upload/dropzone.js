'use strict';
import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import LocalBrowserButton from './uploadButton';
import { filesIcon } from '../../../../icons';
import { ButtonWrapper, DefaultImage, DropzoneText, DropzoneContainer, DropzoneContentWrapper, TextWrapper, } from './styled';
var Dropzone = /** @class */ (function (_super) {
    tslib_1.__extends(Dropzone, _super);
    function Dropzone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dropzone.prototype.render = function () {
        var _a = this.props, isEmpty = _a.isEmpty, mpBrowser = _a.mpBrowser;
        return (React.createElement(DropzoneContainer, { isEmpty: isEmpty },
            React.createElement(DropzoneContentWrapper, null,
                React.createElement(DefaultImage, { src: filesIcon }),
                React.createElement(TextWrapper, null,
                    React.createElement(DropzoneText, null,
                        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.drag_and_drop_your_files))),
                    React.createElement(ButtonWrapper, null,
                        React.createElement(LocalBrowserButton, { mpBrowser: mpBrowser }))))));
    };
    return Dropzone;
}(Component));
export { Dropzone };
//# sourceMappingURL=dropzone.js.map