import React, { Component, Fragment } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import MessageRenderer from '@uidu/message-renderer';
import MessageForm from '@uidu/message-form';
import MessagesAttachments from './MessageAttachments';

import StyledMessage, { StyledMessageEmoji } from '../styled/Message';
import { isOnlyEmojis } from '../utils';

export default class Message extends Component {
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
    const { message, children } = this.props;
    const { editing, hovered, isDropdownOpen } = this.state;

    if (isOnlyEmojis(message.body)) {
      return (
        <StyledMessageEmoji className="message mt-2 hoverable position-relative">
          {message.body}
        </StyledMessageEmoji>
      );
    }

    return (
      <StyledMessage
        className="message mt-1 hoverable position-relative"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: isDropdownOpen })}
      >
        {editing ? (
          <div className="m-3">
            <MessageForm
              {...this.props}
              message={message}
              onDismiss={() => this.setState({ editing: false })}
              onSubmit={() => this.setState({ editing: false })}
            />
          </div>
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
        {(message.attachments || []).length > 0 && (
          <MessagesAttachments attachments={message.attachments} />
        )}
        {!editing &&
          children &&
          children({
            editing,
            hovered,
            onDropdownChange: this.keepActionsVisible,
            setEditing: this.setEditing,
          })}
      </StyledMessage>
    );
  }
}
