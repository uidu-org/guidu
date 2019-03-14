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

import { InlineCardResolvedViewProps } from '@uidu/media-ui';

import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { BuildInlineProps } from './types';
import {
  JIRA_GENERATOR_ID,
  JIRA_TASK,
  JIRA_SUB_TASK,
  JIRA_STORY,
  JIRA_BUG,
  JIRA_EPIC,
  JIRA_INCIDENT,
  JIRA_SERVICE_REQUEST,
  JIRA_CHANGE,
  JIRA_PROBLEM,
  JIRA_CUSTOM_TASK_TYPE,
} from './constants';

export type BuildInlineTaskProps = BuildInlineProps<
  InlineCardResolvedViewProps
>;

const buildInlineTaskIcon: BuildInlineTaskProps = json => {
  // Render AtlasKit icons for all supported Jira issue types.
  if (
    json.generator &&
    json.generator['@id'] === JIRA_GENERATOR_ID &&
    json.taskType &&
    json.taskType['@id']
  ) {
    const taskType = json.taskType['@id'];
    const taskTypeName = taskType.split('#').pop();
    const taskLabel = json.name || '';
    switch (taskTypeName) {
      case JIRA_TASK:
        return { icon: <JiraTaskIcon label={taskLabel} /> };
      case JIRA_SUB_TASK:
        return { icon: <JiraSubTaskIcon label={taskLabel} /> };
      case JIRA_STORY:
        return { icon: <JiraStoryIcon label={taskLabel} /> };
      case JIRA_BUG:
        return { icon: <JiraBugIcon label={taskLabel} /> };
      case JIRA_EPIC:
        return { icon: <JiraEpicIcon label={taskLabel} /> };
      case JIRA_INCIDENT:
        return { icon: <JiraIncidentIcon label={taskLabel} /> };
      case JIRA_SERVICE_REQUEST:
        return { icon: <JiraServiceRequestIcon label={taskLabel} /> };
      case JIRA_CHANGE:
        return { icon: <JiraChangeIcon label={taskLabel} /> };
      case JIRA_PROBLEM:
        return { icon: <JiraProblemIcon label={taskLabel} /> };
      case JIRA_CUSTOM_TASK_TYPE:
        return {
          icon: (json.icon && json.icon.url) || (
            <DefaultTaskIcon label={json.provider ? json.provider.name : ''} />
          ),
        };
    }
  }
  return {
    icon: <DefaultTaskIcon label={json.provider ? json.provider.name : ''} />,
  };
};

const buildInlineTaskTag: BuildInlineTaskProps = json => {
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

export function extractInlineViewPropsFromTask(
  json: any,
): InlineCardResolvedViewProps {
  const props = extractInlineViewPropsFromObject(json);
  return {
    ...props,
    ...buildInlineTaskTag(json),
    ...buildInlineTaskIcon(json),
  };
}
