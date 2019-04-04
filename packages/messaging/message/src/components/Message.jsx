import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import MessageRenderer from '@uidu/message-renderer';
import MessageForm from '@uidu/message-form';
// import { autolinker, automentioner } from 'utils';

import MessagesAttachments from './MessageAttachments';

import StyledMessage from '../styled/Message';

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

    return (
      <StyledMessage
        className="message mt-2 hoverable position-relative"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: isDropdownOpen })}
      >
        <small
          className="text-muted ml-2 d-hover position-absolute"
          style={{
            right: '8px',
            bottom: '2px',
          }}
        >
          {moment(message.createdAt).format('HH:mm')}
        </small>
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
          <p className="mb-0">
            <MessageRenderer tagName="fragment" content={message.body} />
          </p>
        )}
        {(message.attachments || []).length > 0 && (
          <MessagesAttachments attachments={message.attachments} />
        )}
        {children({
          editing,
          hovered,
          onDropdownChange: this.keepActionsVisible,
          setEditing: this.setEditing,
        })}
      </StyledMessage>
    );
  }
}
