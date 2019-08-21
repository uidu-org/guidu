import InviteTeamIcon from '@atlaskit/icon/glyph/editor/add';
import Avatar from '@uidu/avatar';
import AvatarGroup from '@uidu/avatar-group';
import { akEditorSmallZIndex } from '@uidu/editor-common';
import { colors, gridSize } from '@uidu/theme';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import styled, { keyframes } from 'styled-components';
import ToolbarButton from '../../../components/ToolbarButton';
import WithPluginState from '../../../components/WithPluginState';
import { EventDispatcher } from '../../../event-dispatcher';
import messages from '../../../messages';
import { pluginKey as collabEditPluginKey, PluginState } from '../plugin';
import { CollabInviteToEditProps } from '../types';
import { getAvatarColor } from '../utils';

export type Props = {
  editorView?: EditorView;
  eventDispatcher?: EventDispatcher;
} & CollabInviteToEditProps;

const AvatarContainer = styled.div`
  margin-right: ${gridSize()}px;
  display: flex;
  align-items: center;
  div:last-child button.invite-to-edit {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    padding: 2px;
  }
`;

const InviteTeamWrapper = styled.div`
  background: ${colors.N20};
  border-radius: 50%;
  min-width: ${gridSize() * 4}px;
  margin-left: -${gridSize() / 2}px;
`;

const itemAppear = keyframes`
0% {
  transform: scale(0);
}

50% {
  transform: scale(1.1);
}

100% {
  transform: scale(1);
}
`;

const animateAvatar = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  if (!shouldAnimate) {
    return false;
  }

  return `
    & > div {
      animation: ${itemAppear} 500ms 1;
      animation-fill-mode: both;
    }
  `;
};

const animateBadge = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  if (!shouldAnimate) {
    return false;
  }

  return `
    animation: ${itemAppear} 250ms 1;
    animation-fill-mode: both;
    animation-delay: 400ms;
  `;
};

const AvatarItem: any = styled.div`
  position: relative;
  align-self: center;

  ${animateAvatar}

  &::before {
    content: '${(props: any) => props.avatar}';
    display: block;
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 13px;
    height: 13px;
    z-index: ${akEditorSmallZIndex};
    border-radius: 3px;
    background: ${(props: any) => props.badgeColor};
    color: #fff;
    font-size: 9px;
    line-height: 0;
    padding-top: 7px;
    text-align: center;
    box-shadow: 0 0 1px #fff;
    box-sizing: border-box;

    ${animateBadge}
  }
`;

function Item(props: any) {
  const color = getAvatarColor(props.sessionId).color.solid;
  const avatar = props.name.substr(0, 1).toUpperCase();
  const { children, theme, ...other } = props;

  return (
    <AvatarItem
      badgeColor={color}
      avatar={avatar}
      shouldAnimate={props.isInteractive}
    >
      <Avatar {...other} />
    </AvatarItem>
  );
}
class Avatars extends React.Component<Props & WrappedComponentProps, any> {
  private onAvatarClick = () => {};
  private renderInviteToEditButton = () => {
    const {
      inviteToEditComponent: InviteToEditComponent,
      inviteToEditHandler,
      isInviteToEditButtonSelected,
    } = this.props;

    const button = (
      <FormattedMessage {...messages.inviteToEditButtonTitle}>
        {(inviteToEditButtonTitle: string) => (
          <ToolbarButton
            className="invite-to-edit"
            onClick={inviteToEditHandler}
            selected={isInviteToEditButtonSelected}
            title={inviteToEditButtonTitle}
            titlePosition="bottom"
            iconBefore={<InviteTeamIcon label={inviteToEditButtonTitle} />}
          />
        )}
      </FormattedMessage>
    );

    if (InviteToEditComponent) {
      return (
        <InviteTeamWrapper>
          <InviteToEditComponent>{button}</InviteToEditComponent>
        </InviteTeamWrapper>
      );
    } else if (inviteToEditHandler) {
      return <InviteTeamWrapper>{button}</InviteTeamWrapper>;
    }

    return null;
  };
  private renderAvatars = (state: { data?: PluginState }) => {
    if (!state.data) {
      return null;
    }
    const { sessionId, activeParticipants } = state.data as PluginState;
    const avatars = activeParticipants
      .toArray()
      .map(p => ({
        email: p.email,
        key: p.sessionId,
        name: p.name,
        src: p.avatar,
        sessionId: p.sessionId,
        size: 'medium',
        component: Item,
      }))
      .sort(p => (p.sessionId === sessionId ? -1 : 1));

    if (!avatars.length) {
      return null;
    }

    return (
      <AvatarContainer>
        <AvatarGroup
          appearance="stack"
          size="medium"
          data={avatars}
          onAvatarClick={this.onAvatarClick}
        />
        {this.renderInviteToEditButton()}
      </AvatarContainer>
    );
  };

  render() {
    return (
      <WithPluginState
        plugins={{ data: collabEditPluginKey }}
        render={this.renderAvatars}
        editorView={this.props.editorView}
      />
    );
  }
}

export default injectIntl(Avatars);
