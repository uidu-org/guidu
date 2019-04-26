import * as tslib_1 from "tslib";
import * as React from 'react';
import ChatIcon from '@atlaskit/icon/glyph/comment';
import { colors } from '@uidu/theme';
import { FormattedRelative } from 'react-intl';
export var buildTaskTitle = function (json) {
    var name = json.name && json.name.trim();
    return name ? { title: { text: name } } : {};
};
export var buildTaskDescription = function (json) {
    var summary = json.summary && json.summary.trim();
    return summary ? { description: { text: summary } } : {};
};
export var buildTaskLink = function (json) {
    var url = json.url && json.url.trim();
    return url ? { link: url } : {};
};
export var buildTaskByline = function (json) {
    var updatedBy = json.updatedBy && json.updatedBy.name ? ' by ' + json.updatedBy.name : '';
    var attributedTo = json.attributedTo && json.attributedTo.name
        ? ' by ' + json.attributedTo.name
        : '';
    if (json.dateCreated || json.updated) {
        return {
            byline: json.updated ? (React.createElement("span", null,
                "Updated ",
                updatedBy,
                " ",
                React.createElement(FormattedRelative, { value: json.updated }))) : (React.createElement("span", null,
                "Created ",
                attributedTo,
                " ",
                React.createElement(FormattedRelative, { value: json.dateCreated }))),
        };
    }
    return {};
};
export var buildTaskUser = function (json) {
    if (json.assignedBy && (json.assignedBy.image || json.assignedBy.name)) {
        return {
            user: tslib_1.__assign({}, (json.assignedBy.image ? { icon: json.assignedBy.image } : {}), (json.assignedBy.name ? { name: json.assignedBy.name } : {})),
        };
    }
    return {};
};
export var buildTaskUsers = function (json) {
    if (Array.isArray(json.assignedTo) && json.assignedTo.length > 0) {
        return {
            users: json.assignedTo.map(function (assignee) { return ({
                icon: assignee.image,
                name: assignee.name,
            }); }),
        };
    }
    return {};
};
export var buildTaskCommentCount = function (json) {
    if (!isNaN(Number(json.commentCount)) && Number(json.commentCount) > 0) {
        return {
            icon: (React.createElement(ChatIcon, { label: "", key: "comments-count-icon", size: "medium", primaryColor: colors.N600 })),
            text: String(json.commentCount),
        };
    }
    return {};
};
export var buildTaskDetailsLozenge = function (json) {
    if (json.taskStatus && json.taskStatus.name) {
        return {
            lozenge: {
                text: json.taskStatus.name,
                appearance: 'success',
            },
        };
    }
    return {};
};
export var buildTaskDetails = function (json) {
    if (json.taskStatus || json.commentCount) {
        return {
            details: [buildTaskDetailsLozenge(json), buildTaskCommentCount(json)],
        };
    }
    return {};
};
export var buildTaskContext = function (json) {
    var genName = json.generator && json.generator.name && json.generator.name.trim();
    if (genName) {
        var additional = (json.context &&
            json.context.name &&
            json.context.name.trim() &&
            " / " + json.context.name.trim()) ||
            '';
        return {
            context: tslib_1.__assign({ text: genName + additional }, (json.generator.icon ? { icon: json.generator.icon } : {})),
        };
    }
    return {};
};
export function extractBlockViewPropsFromTask(json) {
    if (!json) {
        throw new Error('smart-card: data is not parsable JSON-LD.');
    }
    var props = tslib_1.__assign({}, buildTaskContext(json), buildTaskTitle(json), buildTaskDescription(json), buildTaskLink(json), buildTaskByline(json), buildTaskUser(json), buildTaskUsers(json), buildTaskDetails(json));
    return props;
}
//# sourceMappingURL=extractPropsFromTask.js.map