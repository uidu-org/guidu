import * as tslib_1 from "tslib";
import * as React from 'react';
import * as Loadable from 'react-loadable';
export var getIconForFileType = function (fileMimeType) {
    var icon = typeToIcon[fileMimeType.toLowerCase()];
    if (!icon) {
        return;
    }
    var _a = tslib_1.__read(icon, 2), label = _a[0], importCb = _a[1];
    if (!importCb) {
        return;
    }
    var Icon = Loadable({
        loader: function () { return importCb().then(function (module) { return module.default; }); },
        loading: function () { return null; },
    }); // because we're using dynamic loading here, TS will not be able to infer the type
    return React.createElement(Icon, { label: label });
};
export var getLabelForFileType = function (fileMimeType) {
    var icon = typeToIcon[fileMimeType.toLowerCase()];
    if (!icon) {
        return;
    }
    var _a = tslib_1.__read(icon, 1), label = _a[0];
    return label;
};
var typeToIcon = {
    'text/plain': [
        'Document',
        function () { return import('@atlaskit/icon-file-type/glyph/document/24'); },
    ],
    'application/vnd.oasis.opendocument.text': [
        'Document',
        function () { return import('@atlaskit/icon-file-type/glyph/document/24'); },
    ],
    'application/vnd.apple.pages': [
        'Document',
        function () { return import('@atlaskit/icon-file-type/glyph/document/24'); },
    ],
    'application/vnd.google-apps.document': [
        'Google Doc',
        function () { return import('@atlaskit/icon-file-type/glyph/google-doc/24'); },
    ],
    'application/vnd.ms-word': [
        'Word document',
        function () { return import('@atlaskit/icon-file-type/glyph/word-document/24'); },
    ],
    'application/pdf': [
        'PDF document',
        function () { return import('@atlaskit/icon-file-type/glyph/pdf-document/24'); },
    ],
    'application/vnd.oasis.opendocument.spreadsheet': [
        'Spreadsheet',
        function () { return import('@atlaskit/icon-file-type/glyph/spreadsheet/24'); },
    ],
    'application/vnd.apple.numbers': [
        'Spreadsheet',
        function () { return import('@atlaskit/icon-file-type/glyph/spreadsheet/24'); },
    ],
    'application/vnd.google-apps.spreadsheet': [
        'Google Sheet',
        function () { return import('@atlaskit/icon-file-type/glyph/google-sheet/24'); },
    ],
    'application/vnd.ms-excel': [
        'Excel spreadsheet',
        function () { return import('@atlaskit/icon-file-type/glyph/excel-spreadsheet/24'); },
    ],
    'application/vnd.oasis.opendocument.presentation': [
        'Presentation',
        function () { return import('@atlaskit/icon-file-type/glyph/presentation/24'); },
    ],
    'application/vnd.apple.keynote': [
        'Presentation',
        function () { return import('@atlaskit/icon-file-type/glyph/presentation/24'); },
    ],
    'application/vnd.google-apps.presentation': [
        'Google Slide',
        function () { return import('@atlaskit/icon-file-type/glyph/google-slide/24'); },
    ],
    'application/vnd.mspowerpoint': [
        'PowerPoint presentation',
        function () { return import('@atlaskit/icon-file-type/glyph/powerpoint-presentation/24'); },
    ],
    'application/vnd.google-apps.form': [
        'Google Form',
        function () { return import('@atlaskit/icon-file-type/glyph/google-form/24'); },
    ],
    'image/png': [
        'Image',
        function () { return import('@atlaskit/icon-file-type/glyph/image/24'); },
    ],
    'image/jpeg': [
        'Image',
        function () { return import('@atlaskit/icon-file-type/glyph/image/24'); },
    ],
    'image/bmp': [
        'Image',
        function () { return import('@atlaskit/icon-file-type/glyph/image/24'); },
    ],
    'image/webp': [
        'Image',
        function () { return import('@atlaskit/icon-file-type/glyph/image/24'); },
    ],
    'image/svg+xml': [
        'Image',
        function () { return import('@atlaskit/icon-file-type/glyph/image/24'); },
    ],
    'image/gif': ['GIF', function () { return import('@atlaskit/icon-file-type/glyph/gif/24'); }],
    'audio/midi': [
        'Audio',
        function () { return import('@atlaskit/icon-file-type/glyph/audio/24'); },
    ],
    'audio/mpeg': [
        'Audio',
        function () { return import('@atlaskit/icon-file-type/glyph/audio/24'); },
    ],
    'audio/webm': [
        'Audio',
        function () { return import('@atlaskit/icon-file-type/glyph/audio/24'); },
    ],
    'audio/ogg': [
        'Audio',
        function () { return import('@atlaskit/icon-file-type/glyph/audio/24'); },
    ],
    'audio/wav': [
        'Audio',
        function () { return import('@atlaskit/icon-file-type/glyph/audio/24'); },
    ],
    'video/mp4': [
        'Video',
        function () { return import('@atlaskit/icon-file-type/glyph/video/24'); },
    ],
    'video/webm': [
        'Video',
        function () { return import('@atlaskit/icon-file-type/glyph/video/24'); },
    ],
    'video/ogg': [
        'Video',
        function () { return import('@atlaskit/icon-file-type/glyph/video/24'); },
    ],
    'video/x-ms-wmv': [
        'Video',
        function () { return import('@atlaskit/icon-file-type/glyph/video/24'); },
    ],
    'video/x-msvideo': [
        'Video',
        function () { return import('@atlaskit/icon-file-type/glyph/video/24'); },
    ],
    'application/zip': [
        'Archive',
        function () { return import('@atlaskit/icon-file-type/glyph/archive/24'); },
    ],
    'application/x-tar': [
        'Archive',
        function () { return import('@atlaskit/icon-file-type/glyph/archive/24'); },
    ],
    'application/x-gtar': [
        'Archive',
        function () { return import('@atlaskit/icon-file-type/glyph/archive/24'); },
    ],
    'application/x-7z-compressed': [
        'Archive',
        function () { return import('@atlaskit/icon-file-type/glyph/archive/24'); },
    ],
    'application/x-apple-diskimage': [
        'Archive',
        function () { return import('@atlaskit/icon-file-type/glyph/archive/24'); },
    ],
    'application/dmg': [
        'Executable',
        function () { return import('@atlaskit/icon-file-type/glyph/executable/24'); },
    ],
    'text/css': [
        'Source Code',
        function () { return import('@atlaskit/icon-file-type/glyph/source-code/24'); },
    ],
    'text/html': [
        'Source Code',
        function () { return import('@atlaskit/icon-file-type/glyph/source-code/24'); },
    ],
    'application/javascript': [
        'Source Code',
        function () { return import('@atlaskit/icon-file-type/glyph/source-code/24'); },
    ],
    'application/octet-stream': [
        'Binary file',
        function () { return import('@atlaskit/icon-file-type/glyph/generic/24'); },
    ],
    'application/invision.prototype': ['Prototype', undefined],
    // TODO: Figure a way to detect those
    'application/sketch': [
        'Sketch',
        function () { return import('@atlaskit/icon-file-type/glyph/sketch/24'); },
    ],
};
//# sourceMappingURL=getIconForFileType.js.map