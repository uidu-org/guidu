import * as tslib_1 from "tslib";
import * as React from 'react';
import DocumentFilledIcon from '@atlaskit/icon/glyph/document-filled';
import { CONFLUENCE_GENERATOR_ID } from './constants';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
export var buildTemplateIcon = function (json) {
    if (json.generator && json.generator['@id'] === CONFLUENCE_GENERATOR_ID) {
        return { icon: React.createElement(DocumentFilledIcon, { size: "small", label: "Confluence" }) };
    }
    return {};
};
export function extractInlineViewPropsFromTemplate(json) {
    var props = extractInlineViewPropsFromDocument(json);
    return tslib_1.__assign({}, buildTemplateIcon(json), props);
}
//# sourceMappingURL=extractPropsFromTemplate.js.map