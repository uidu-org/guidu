import * as React from 'react';
import { FormattedRelative } from 'react-intl';
import { extractPropsFromObject } from './extractPropsFromObject';
import ChatIcon from '@atlaskit/icon/glyph/comment';
import { colors } from '@uidu/theme';
import { getIconForFileType, getLabelForFileType } from '../getIconForFileType';
export function extractPropsFromDocument(json) {
    var props = extractPropsFromObject(json);
    props.icon = getIconForFileType(json.fileFormat || '');
    props.details = [];
    if (json.commentCount) {
        var commentCount = json.commentCount;
        var intCommentCount = parseInt(commentCount, 10);
        // Only show the comment count if it's a string or an integer > 0
        if (isNaN(intCommentCount) || intCommentCount) {
            props.details.push({
                icon: (React.createElement(ChatIcon, { label: "", key: "comments-count-icon", size: "medium", primaryColor: colors.N600 })),
                text: "" + json.commentCount,
            });
        }
    }
    var typeDescription = getLabelForFileType(json.fileFormat || '') || 'Document';
    // Note: we're relying on the consumers to pass a proper react-intl context that
    // formats relative time according to the spec:
    // https://hello.atlassian.net/wiki/spaces/ADG/pages/195123084/Date+formats+product+1.0+spec
    if (json.updated && json.updatedBy) {
        var lastPerson = void 0;
        if (Array.isArray(json.updatedBy)) {
            lastPerson = json.updatedBy.pop();
            props.details.concat(json.updatedBy.map(function (person) { return ({
                text: person.name,
                icon: person.icon,
            }); }));
        }
        else {
            lastPerson = json.updatedBy;
        }
        props.byline = (React.createElement("span", null,
            typeDescription,
            " \u00B7 Updated by ",
            lastPerson.name,
            ' ',
            React.createElement(FormattedRelative, { value: json.updated })));
    }
    else if (json.attributedTo) {
        var person = Array.isArray(json.attributedTo)
            ? json.attributedTo.pop()
            : json.attributedTo;
        props.byline = (React.createElement("span", null,
            typeDescription,
            " \u00B7 Created by ",
            person.name,
            ' ',
            React.createElement(FormattedRelative, { value: json.dateCreated })));
    }
    if (json.image && json.image.url) {
        props.preview = json.image.url;
    }
    return props;
}
//# sourceMappingURL=extractPropsFromDocument.js.map