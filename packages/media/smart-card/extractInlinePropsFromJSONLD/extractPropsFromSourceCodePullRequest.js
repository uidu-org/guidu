import * as tslib_1 from "tslib";
import * as React from 'react';
import PullRequestIcon from '@atlaskit/icon-object/glyph/pull-request/16';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
export var buildName = function (props, json) {
    var nextProps = tslib_1.__assign({}, props);
    var link = nextProps.link || json['@url'];
    if (link) {
        var repoNumber = link.match(/.*?(\d+)[^0-9]*$/).pop();
        return { title: "#" + repoNumber + " " + nextProps.title };
    }
    return nextProps;
};
var buildInlineSourceCodePullRequestTag = function (json) {
    if (json['atlassian:state']) {
        return {
            lozenge: {
                appearance: 'success',
                text: json['atlassian:state'],
            },
        };
    }
    return {};
};
export var buildIcon = function (json) {
    var name = json.name;
    return { icon: React.createElement(PullRequestIcon, { label: name }) };
};
export var extractInlineViewPropsFromSourceCodePullRequest = function (json) {
    var props = extractInlineViewPropsFromObject(json);
    return tslib_1.__assign({}, props, buildIcon(json), buildName(props, json), buildInlineSourceCodePullRequestTag(json));
};
//# sourceMappingURL=extractPropsFromSourceCodePullRequest.js.map