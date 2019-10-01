export enum EVENT_TYPE {
  OPERATIONAL = 'operational',
  SCREEN = 'screen',
  TRACK = 'track',
  UI = 'ui',
}

export enum ACTION {
  STARTED = 'started',
  RENDERED = 'rendered',
  CLICKED = 'clicked',
  VIEWED = 'viewed',
  SORT_COLUMN = 'sortedColumn',
  SORT_COLUMN_NOT_ALLOWED = 'sortColumnNotAllowed',
}

export enum ACTION_SUBJECT {
  RENDERER = 'renderer',
  BUTTON = 'button',
  ANCHOR_LINK = 'anchorLink',
  TABLE = 'table',
}

export enum ACTION_SUBJECT_ID {
  HEADING_ANCHOR_LINK = 'headingAnchorLink',
}

export type AEP<
  Action,
  ActionSubject,
  ActionSubjectID,
  Attributes,
  EventType
> = {
  action: Action;
  actionSubject: ActionSubject;
  actionSubjectId?: ActionSubjectID;
  attributes?: Attributes;
  eventType: EventType;
};
