import * as tslib_1 from "tslib";
import * as React from 'react';
import DefaultTaskIcon from '@atlaskit/icon-object/glyph/task/16';
import JiraTaskIcon from '@atlaskit/icon-object/glyph/task/16';
import JiraSubTaskIcon from '@atlaskit/icon-object/glyph/subtask/16';
import JiraStoryIcon from '@atlaskit/icon-object/glyph/story/16';
import JiraBugIcon from '@atlaskit/icon-object/glyph/bug/16';
import JiraEpicIcon from '@atlaskit/icon-object/glyph/epic/16';
import JiraIncidentIcon from '@atlaskit/icon-object/glyph/incident/16';
import JiraServiceRequestIcon from '@atlaskit/icon-object/glyph/issue/16';
import JiraChangeIcon from '@atlaskit/icon-object/glyph/changes/16';
import JiraProblemIcon from '@atlaskit/icon-object/glyph/problem/16';
import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { JIRA_GENERATOR_ID, JIRA_TASK, JIRA_SUB_TASK, JIRA_STORY, JIRA_BUG, JIRA_EPIC, JIRA_INCIDENT, JIRA_SERVICE_REQUEST, JIRA_CHANGE, JIRA_PROBLEM, JIRA_CUSTOM_TASK_TYPE, } from './constants';
var buildInlineTaskIcon = function (json) {
    // Render AtlasKit icons for all supported Jira issue types.
    if (json.generator &&
        json.generator['@id'] === JIRA_GENERATOR_ID &&
        json.taskType &&
        json.taskType['@id']) {
        var taskType = json.taskType['@id'];
        var taskTypeName = taskType.split('#').pop();
        var taskLabel = json.name || '';
        switch (taskTypeName) {
            case JIRA_TASK:
                return { icon: React.createElement(JiraTaskIcon, { label: taskLabel }) };
            case JIRA_SUB_TASK:
                return { icon: React.createElement(JiraSubTaskIcon, { label: taskLabel }) };
            case JIRA_STORY:
                return { icon: React.createElement(JiraStoryIcon, { label: taskLabel }) };
            case JIRA_BUG:
                return { icon: React.createElement(JiraBugIcon, { label: taskLabel }) };
            case JIRA_EPIC:
                return { icon: React.createElement(JiraEpicIcon, { label: taskLabel }) };
            case JIRA_INCIDENT:
                return { icon: React.createElement(JiraIncidentIcon, { label: taskLabel }) };
            case JIRA_SERVICE_REQUEST:
                return { icon: React.createElement(JiraServiceRequestIcon, { label: taskLabel }) };
            case JIRA_CHANGE:
                return { icon: React.createElement(JiraChangeIcon, { label: taskLabel }) };
            case JIRA_PROBLEM:
                return { icon: React.createElement(JiraProblemIcon, { label: taskLabel }) };
            case JIRA_CUSTOM_TASK_TYPE:
                return {
                    icon: (json.icon && json.icon.url) || (React.createElement(DefaultTaskIcon, { label: json.provider ? json.provider.name : '' })),
                };
        }
    }
    return {
        icon: React.createElement(DefaultTaskIcon, { label: json.provider ? json.provider.name : '' }),
    };
};
var buildInlineTaskTag = function (json) {
    if (json.tag && json.tag.name) {
        return {
            lozenge: {
                appearance: 'success',
                text: json.tag.name,
            },
        };
    }
    return {};
};
export function extractInlineViewPropsFromTask(json) {
    var props = extractInlineViewPropsFromObject(json);
    return tslib_1.__assign({}, props, buildInlineTaskTag(json), buildInlineTaskIcon(json));
}
//# sourceMappingURL=extractPropsFromTask.js.map