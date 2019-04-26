import * as tslib_1 from "tslib";
import * as React from 'react';
import ConfluencePageIcon from '@atlaskit/icon-object/glyph/page/16';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
import { CONFLUENCE_GENERATOR_ID } from './constants';
export var buildTextDocumentIcon = function (json) {
    if (json.generator && json.generator['@id'] === CONFLUENCE_GENERATOR_ID) {
        return { icon: React.createElement(ConfluencePageIcon, { label: "Confluence" }) };
    }
    return {};
};
export function extractInlineViewPropsFromTextDocument(json) {
    var props = extractInlineViewPropsFromDocument(json);
    return tslib_1.__assign({}, props, buildTextDocumentIcon(json));
}
//# sourceMappingURL=extractPropsFromTextDocument.js.map