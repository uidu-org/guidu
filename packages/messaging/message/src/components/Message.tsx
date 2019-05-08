import MessageForm from '@uidu/message-form';
import MessageRenderer from '@uidu/message-renderer';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import StyledMessage, { StyledMessageEmoji } from '../styled/Message';
import { Message as MessageProps, MessageState } from '../types';
import { isOnlyEmojis } from '../utils';
import MessagesAttachments from './MessageAttachments';
import MobileViewMessage from './MobileView/Message';

export default class Message extends Component<MessageProps, MessageState> {
  static defaultProps = {
    showAttachments: true,
  };

  state = {
    editing: false,
    hovered: false,
    isDropdownOpen: false,
  };

  keepActionsVisible = ({ isOpen }) => {
    this.setState({
      isDropdownOpen: isOpen,
    });
  };

  setEditing = () => this.setState({ editing: true });

  render() {
    const {
      message,
      children,
      showAttachments,
      mobileView,
      reverse,
    } = this.props;
    const { editing, hovered, isDropdownOpen } = this.state;

    if (isOnlyEmojis(message.body)) {
      return (
        <StyledMessageEmoji
          className={classNames('message mt-2', {
            'text-right': reverse,
          })}
        >
          <span>{message.body}</span>
        </StyledMessageEmoji>
      );
    }

    if (mobileView) {
      return <MobileViewMessage {...this.props} />;
    } else {
      return [
        <StyledMessage
          className="message mt-1 hoverable position-relative"
          onMouseEnter={() => this.setState({ hovered: true })}
          onMouseLeave={() => this.setState({ hovered: isDropdownOpen })}
        >
          {editing ? (
            <MessageForm
              {...this.props}
              message={message}
              onDismiss={() => this.setState({ editing: false })}
              onSubmit={() => this.setState({ editing: false })}
            />
          ) : (
            <Fragment>
              <small
                className="text-muted ml-2 d-hover position-absolute"
                style={{
                  backgroundColor: '#f8f9fa',
                  right: '2px',
                  bottom: '2px',
                  padding: '0 0 0 1rem',
                }}
              >
                {moment(message.createdAt).format('HH:mm')}
              </small>
              <div className="mb-0">
                <MessageRenderer tagName="fragment" content={message.body} />
              </div>
            </Fragment>
          )}
          {!editing &&
            children &&
            children({
              editing,
              hovered,
              onDropdownChange: this.keepActionsVisible,
              setEditing: this.setEditing,
            })}
        </StyledMessage>,
        (message.attachments || []).length > 0 && showAttachments && (
          <MessagesAttachments attachments={message.attachments} />
        ),
      ];
    }
  }
}
