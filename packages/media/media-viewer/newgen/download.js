import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { isErrorFileState, } from '@uidu/media-core';
import { DownloadButtonWrapper } from './styled';
import Button from '@uidu/button';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { downloadButtonEvent, downloadErrorButtonEvent, } from './analytics/download';
import { channel } from './analytics';
import DownloadIcon from '@atlaskit/icon/glyph/download';
var downloadIcon = React.createElement(DownloadIcon, { label: "Download" });
// TODO: MS-1556
export var DownloadButton = withAnalyticsEvents({
    onClick: function (createEvent, props) {
        var ev = createEvent(props.analyticsPayload);
        ev.fire(channel);
    },
})(Button);
export var createItemDownloader = function (file, context, collectionName) { return function () {
    var id = file.id;
    var name = !isErrorFileState(file) ? file.name : undefined;
    return context.file.downloadBinary(id, name, collectionName);
}; };
export var ErrorViewDownloadButton = function (props) {
    var downloadEvent = downloadErrorButtonEvent(props.state, props.err);
    return (React.createElement(DownloadButtonWrapper, null,
        React.createElement(DownloadButton, { analyticsPayload: downloadEvent, appearance: "primary", onClick: createItemDownloader(props.state, props.context, props.collectionName) },
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.download)))));
};
export var ToolbarDownloadButton = function (props) {
    var downloadEvent = downloadButtonEvent(props.state);
    return (React.createElement(DownloadButton, { analyticsPayload: downloadEvent, appearance: 'toolbar', onClick: createItemDownloader(props.state, props.context, props.identifier.collectionName), iconBefore: downloadIcon }));
};
export var DisabledToolbarDownloadButton = (React.createElement(Button, { appearance: 'toolbar', isDisabled: true, iconBefore: downloadIcon }));
//# sourceMappingURL=download.js.map