import { MentionUserType as UserType } from '@uidu/adf-schema';
import { MentionProvider, ResourcedMention } from '@uidu/mentions';
import React, { PureComponent } from 'react';
import { MentionEventHandlers } from '../EventHandlers';

export interface Props {
  id: string;
  text: string;
  accessLevel?: string;
  userType?: UserType;
  mentionProvider?: Promise<MentionProvider>;
  eventHandlers?: MentionEventHandlers;
  portal?: HTMLElement;
}

export interface State {}

const GENERIC_USER_IDS = ['HipChat', 'all', 'here'];
const noop = () => {};

export default class MentionWithProviders extends PureComponent<Props, State> {
  state: State = {};

  UNSAFE_componentWillMount() {}

  UNSAFE_componentWillReceiveProps(nextProps: Props) {}

  render() {
    const {
      accessLevel,
      userType,
      eventHandlers,
      id,
      mentionProvider,
      portal,
      text,
    } = this.props;

    const actionHandlers: MentionEventHandlers = {} as any;
    (
      ['onClick', 'onMouseEnter', 'onMouseLeave'] as Array<
        keyof MentionEventHandlers
      >
    ).forEach((handler) => {
      actionHandlers[handler] =
        (eventHandlers && eventHandlers[handler]) || noop;
    });

    const MentionComponent = ResourcedMention;

    return (
      <MentionComponent
        id={id}
        text={text}
        accessLevel={accessLevel}
        userType={userType}
        mentionProvider={mentionProvider}
        portal={portal}
        {...actionHandlers}
      />
    );
  }
}
