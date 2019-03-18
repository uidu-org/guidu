import * as React from 'react';
import {
  BlockCardResolvedViewProps,
  LozengeViewModel,
} from '@uidu/media-ui';
import ChatIcon from '@atlaskit/icon/glyph/comment';
import { colors } from '@uidu/theme';
import { FormattedRelative } from 'react-intl';

export const buildTaskTitle = (json: any) => {
  let name = json.name && json.name.trim();
  return name ? { title: { text: name } } : {};
};

export const buildTaskDescription = (json: any) => {
  const summary = json.summary && json.summary.trim();
  return summary ? { description: { text: summary } } : {};
};

export const buildTaskLink = (json: any) => {
  const url = json.url && json.url.trim();
  return url ? { link: url } : {};
};

export const buildTaskByline = (json: any) => {
  const updatedBy =
    json.updatedBy && json.updatedBy.name ? ' by ' + json.updatedBy.name : '';

  const attributedTo =
    json.attributedTo && json.attributedTo.name
      ? ' by ' + json.attributedTo.name
      : '';

  if (json.dateCreated || json.updated) {
    return {
      byline: json.updated ? (
        <span>
          Updated {updatedBy} <FormattedRelative value={json.updated} />
        </span>
      ) : (
        <span>
          Created {attributedTo} <FormattedRelative value={json.dateCreated} />
        </span>
      ),
    };
  }

  return {};
};

export const buildTaskUser = (json: any) => {
  if (json.assignedBy && (json.assignedBy.image || json.assignedBy.name)) {
    return {
      user: {
        ...(json.assignedBy.image ? { icon: json.assignedBy.image } : {}),
        ...(json.assignedBy.name ? { name: json.assignedBy.name } : {}),
      },
    };
  }
  return {};
};

export const buildTaskUsers = (json: any) => {
  if (Array.isArray(json.assignedTo) && json.assignedTo.length > 0) {
    return {
      users: json.assignedTo.map((assignee: any) => ({
        icon: assignee.image,
        name: assignee.name,
      })),
    };
  }
  return {};
};

export const buildTaskCommentCount = (json: any) => {
  if (!isNaN(Number(json.commentCount)) && Number(json.commentCount) > 0) {
    return {
      icon: (
        <ChatIcon
          label=""
          key="comments-count-icon"
          size="medium"
          primaryColor={colors.N600}
        />
      ),
      text: String(json.commentCount),
    };
  }
  return {};
};

export const buildTaskDetailsLozenge = (json: any) => {
  if (json.taskStatus && json.taskStatus.name) {
    return {
      lozenge: {
        text: json.taskStatus.name,
        appearance: 'success',
      } as LozengeViewModel,
    };
  }
  return {};
};

export const buildTaskDetails = (json: any) => {
  if (json.taskStatus || json.commentCount) {
    return {
      details: [buildTaskDetailsLozenge(json), buildTaskCommentCount(json)],
    };
  }
  return {};
};

export const buildTaskContext = (json: any) => {
  const genName =
    json.generator && json.generator.name && json.generator.name.trim();
  if (genName) {
    let additional =
      (json.context &&
        json.context.name &&
        json.context.name.trim() &&
        ` / ${json.context.name.trim()}`) ||
      '';
    return {
      context: {
        text: genName + additional,
        ...(json.generator.icon ? { icon: json.generator.icon } : {}),
      },
    };
  }
  return {};
};

export function extractBlockViewPropsFromTask(
  json: any,
): BlockCardResolvedViewProps {
  if (!json) {
    throw new Error('smart-card: data is not parsable JSON-LD.');
  }

  const props: BlockCardResolvedViewProps = {
    ...buildTaskContext(json),
    ...buildTaskTitle(json),
    ...buildTaskDescription(json),
    ...buildTaskLink(json),
    ...buildTaskByline(json),
    ...buildTaskUser(json),
    ...buildTaskUsers(json),
    ...buildTaskDetails(json),
  };

  return props;
}
