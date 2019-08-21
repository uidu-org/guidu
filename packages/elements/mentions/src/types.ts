import { SyntheticEvent } from 'react';

export interface HighlightDetail {
  start: number;
  end: number;
}

export interface Highlight {
  name: HighlightDetail[];
  mentionName: HighlightDetail[];
  nickname: HighlightDetail[];
}

export interface Presence {
  time?: string;
  status?: string;
}

export interface MentionDescription {
  id: string;
  avatarUrl?: string;
  name?: string;
  mentionName?: string;
  nickname?: string;
  highlight?: Highlight;
  lozenge?: string;
  presence?: Presence;
  accessLevel?: string;
  inContext?: boolean;
  userType?: string;
  // Team mention can use context to store members data
  context?: MentionDescContext;
}

export interface MentionDescContext {
  members: TeamMember[];
  includesYou: boolean;
  memberCount: number;
  teamLink: string;
}

export interface MentionsResult {
  mentions: MentionDescription[];
  query: string;
}

export interface TeamMember {
  id: string;
  name: string;
}

// data is returned from team search service
export interface Team {
  id: string;
  smallAvatarImageUrl: string;
  displayName: string;
  members: TeamMember[];
  includesYou: boolean;
  memberCount: number;
  highlight?: Highlight;
}

export type MentionEventHandler = (
  mentionId: string,
  text: string,
  event?: SyntheticEvent<HTMLSpanElement>,
) => void;

export interface OnMentionEvent {
  (mention: MentionDescription, event?: SyntheticEvent<any>): void;
}

export enum MentionType {
  SELF,
  RESTRICTED,
  DEFAULT,
}

export enum UserAccessLevel {
  NONE,
  SITE,
  APPLICATION,
  CONTAINER,
}

export enum UserType {
  DEFAULT,
  SPECIAL,
  APP,
  TEAM,
  SYSTEM,
}

export enum MentionNameStatus {
  UNKNOWN,
  SERVICE_ERROR,
  OK,
}

export interface MentionNameDetails {
  id: string;
  name?: string;
  status: MentionNameStatus;
}

export function isRestricted(accessLevel?: string): boolean {
  return (
    !!accessLevel && accessLevel !== UserAccessLevel[UserAccessLevel.CONTAINER]
  );
}

export function isSpecialMention(mention: MentionDescription): boolean {
  return !!mention.userType && mention.userType === UserType[UserType.SPECIAL];
}

export function isAppMention(mention: MentionDescription) {
  return mention.userType && mention.userType === UserType[UserType.APP];
}

export function isTeamMention(mention: MentionDescription) {
  return mention.userType && mention.userType === UserType[UserType.TEAM];
}

export function isSpecialMentionText(mentionText: string) {
  return mentionText && (mentionText === '@all' || mentionText === '@here');
}

export const isPromise = <T>(p: any): p is Promise<T> => !!(p && p.then);
