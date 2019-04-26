import * as tslib_1 from "tslib";
import * as React from 'react';
import ProjectDefaultIcon from '@atlaskit/icon/glyph/people-group';
import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
export var buildProjectIcon = function (json) {
    if (json.icon && json.icon.url) {
        return { icon: json.icon.url };
    }
    return {
        icon: React.createElement(ProjectDefaultIcon, { size: "small", label: json.name || 'Project' }),
    };
};
export function extractInlineViewPropsFromProject(json) {
    var props = extractInlineViewPropsFromDocument(json);
    return tslib_1.__assign({}, props, buildProjectIcon(json));
}
//# sourceMappingURL=extractPropsFromProject.js.map