// @flow
import type { ComponentType, Element } from 'react';

export type StatusType = 'unvisited' | 'visited' | 'current' | 'disabled';

/** Ideally these are exported by @atlaskit/page */
export type Spacing = 'comfortable' | 'cosy' | 'compact';

export type Stage = {
  id: string,
  label: string,
  percentageComplete: number,
  status: StatusType,
  noLink?: boolean,
};

export type Stages = Array<Stage>;

export type LinkComponentProps = {
  item: Stage & any,
};

export type LinkElement = Element<ComponentType<LinkComponentProps>>;

export type ProgressTrackerStageRenderProp = {
  link: (props: LinkComponentProps) => LinkElement,
};
