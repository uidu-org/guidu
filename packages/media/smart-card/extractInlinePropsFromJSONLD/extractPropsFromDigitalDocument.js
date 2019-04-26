import * as tslib_1 from "tslib";
import * as React from 'react';
import FileIcon from '@atlaskit/icon-file-type/glyph/generic/16';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
export var buildIcon = function (json) {
    var name = json.name;
    return { icon: React.createElement(FileIcon, { label: name }) };
};
export var extractInlineViewPropsFromDigitalDocument = function (json) {
    var props = extractInlineViewPropsFromDocument(json);
    return tslib_1.__assign({}, props, buildIcon(json));
};
//# sourceMappingURL=extractPropsFromDigitalDocument.js.map