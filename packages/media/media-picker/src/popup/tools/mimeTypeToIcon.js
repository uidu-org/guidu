import * as tslib_1 from "tslib";
import * as React from 'react';
import FolderFilledIcon from '@atlaskit/icon/glyph/folder-filled';
import ImageIcon from '@atlaskit/icon/glyph/media-services/image';
import VideoIcon from '@atlaskit/icon/glyph/media-services/video';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import SpreadSheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
import PresentationIcon from '@atlaskit/icon/glyph/media-services/presentation';
import DocumentIcon from '@atlaskit/icon/glyph/media-services/document';
import PDFDocumentIcon from '@atlaskit/icon/glyph/media-services/pdf';
import ZipDocumentIcon from '@atlaskit/icon/glyph/media-services/zip';
import UnknownIcon from '@atlaskit/icon/glyph/media-services/unknown';
import { colors } from '@uidu/theme';
import styled from 'styled-components';
var IconWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (_a) {
    var color = _a.color;
    return "color: " + color + ";";
});
function isFolder(mimeType) {
    return mimeType === 'application/vnd.atlassian.mediapicker.folder';
}
function isImage(mimeType) {
    return mimeType.indexOf('image/') === 0;
}
function isVideo(mimeType) {
    return mimeType.indexOf('video/') === 0;
}
function isAudio(mimeType) {
    return mimeType.indexOf('audio/') === 0;
}
function isPDF(mimeType) {
    return mimeType === 'application/pdf';
}
function isSpreadsheet(mimeType) {
    return ([
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/x-iwork-keynote-sffnumbers',
    ].indexOf(mimeType) > -1);
}
function isPresentation(mimeType) {
    return ([
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint',
        'application/x-iwork-keynote-sffkey',
    ].indexOf(mimeType) > -1);
}
function isDocument(mimeType) {
    return ([
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/x-iwork-pages-sffpages',
    ].indexOf(mimeType) > -1);
}
function isArchive(mimeType) {
    return ([
        'application/zip',
        'application/x-7z-compressed',
        'application/x-bzip',
        'application/x-bzip2',
    ].indexOf(mimeType) > -1);
}
export var mapMimeTypeToIcon = function (mimeType) {
    if (isFolder(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.B75 },
            React.createElement(FolderFilledIcon, { label: "folder" })));
    }
    else if (isImage(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.Y200 },
            React.createElement(ImageIcon, { label: "image" })));
    }
    else if (isVideo(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.R300 },
            React.createElement(VideoIcon, { label: "video" })));
    }
    else if (isAudio(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.P200 },
            React.createElement(AudioIcon, { label: "audio" })));
    }
    else if (isSpreadsheet(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.G300 },
            React.createElement(SpreadSheetIcon, { label: "spreadsheet" })));
    }
    else if (isPresentation(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.Y400 },
            React.createElement(PresentationIcon, { label: "presentation" })));
    }
    else if (isDocument(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.B200 },
            React.createElement(DocumentIcon, { label: "document" })));
    }
    else if (isPDF(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.R400 },
            React.createElement(PDFDocumentIcon, { label: "pdf document" })));
    }
    else if (isArchive(mimeType)) {
        return (React.createElement(IconWrapper, { color: colors.N200 },
            React.createElement(ZipDocumentIcon, { label: "zip" })));
    }
    else {
        return (React.createElement(IconWrapper, { color: colors.N70 },
            React.createElement(UnknownIcon, { label: "unknown" })));
    }
};
var templateObject_1;
//# sourceMappingURL=mimeTypeToIcon.js.map