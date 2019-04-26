import * as tslib_1 from "tslib";
import * as React from 'react';
import ConfluenceBlogIcon from '@atlaskit/icon-object/glyph/blog/16';
import { CONFLUENCE_GENERATOR_ID } from './constants';
import { extractInlineViewPropsFromTextDocument } from './extractPropsFromTextDocument';
export var buildBlogPostIcon = function (json) {
    if (json.generator && json.generator['@id'] === CONFLUENCE_GENERATOR_ID) {
        return { icon: React.createElement(ConfluenceBlogIcon, { label: "Confluence" }) };
    }
    return {};
};
export function extractInlineViewPropsFromBlogPost(json) {
    var props = extractInlineViewPropsFromTextDocument(json);
    return tslib_1.__assign({}, props, buildBlogPostIcon(json));
}
//# sourceMappingURL=extractPropsFromBlogPost.js.map