import { ActionMarkAction } from '@atlaskit/adf-schema';
import { SyntheticEvent } from 'react';

export interface CardSurroundings {
  collectionName: string;
  list: Array<any>;
}

export type MentionEventHandler = (
  mentionId: string,
  text: string,
  event?: SyntheticEvent<HTMLSpanElement>,
) => void;
export type CardEventClickHandler = (
  result: any,
  surroundings?: CardSurroundings,
  analyticsEvent?: any,
) => void;
export type ActionEventClickHandler = (action: ActionMarkAction) => void;
export type LinkEventClickHandler = (
  event: SyntheticEvent<HTMLAnchorElement>,
  url?: string,
) => void;
export type SmartCardEventClickHandler = (url?: string) => void;

export interface MentionEventHandlers {
  onClick: MentionEventHandler;
  onMouseEnter: MentionEventHandler;
  onMouseLeave: MentionEventHandler;
}

export interface EventHandlers {
  mention?: MentionEventHandlers;
  media?: {
    onClick?: CardEventClickHandler;
  };
  link?: {
    onClick?: LinkEventClickHandler;
  };
  smartCard?: {
    onClick?: SmartCardEventClickHandler;
  };
  action?: {
    onClick?: ActionEventClickHandler;
  };
}
