import * as tslib_1 from "tslib";
import * as React from 'react';
import BranchIcon from '@atlaskit/icon-object/glyph/branch/16';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
export var buildIcon = function (json) {
    var name = json.name;
    return { icon: React.createElement(BranchIcon, { label: name }) };
};
export var extractInlineViewPropsFromSourceCodeReference = function (json) {
    var props = extractInlineViewPropsFromObject(json);
    return tslib_1.__assign({}, props, buildIcon(json));
};
//# sourceMappingURL=extractPropsFromSourceCodeReference.js.map