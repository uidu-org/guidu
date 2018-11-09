import React, { Component } from 'react';
import { Inbox } from 'react-feather';
import { ActionCable } from 'react-actioncable-provider';
import { NavLink as Link } from 'react-router-dom';
import Push from 'push.js';

export default class NavbarMessages extends Component {
  getUnseenMessages = () => {
    const { messages } = this.props;
    return messages.filter(elem => !elem.seen_at);
  };

  onReceived = ({ message, kind }) => {
    const { addMessage } = this.props;
    const messageToSubmit = {
      ...message,
      unread: this.isUnread(message),
    };
    Push.create(message.content.body.key);
    return addMessage(message);
  };

  render() {
    const { messages } = this.props;

    return [
      <ActionCable
        channel={{
          channel: 'MessagesChannel',
        }}
        onReceived={this.onReceived}
      />,
      <li className="nav-item">
        <Link
          className="nav-link mx-2 d-flex align-items-center justify-content-center"
          to="/dashboard/conversations"
        >
          {this.getUnseenMessages().length > 0 ? (
            <Inbox size={22} strokeWidth={1} color="currentColor" />
          ) : (
            <Inbox size={22} strokeWidth={1} color="currentColor" />
          )}
          {this.getUnseenMessages().length > 0 && (
            <span className="badge badge-pill badge-success">
              {this.getUnseenMessages().length}
            </span>
          )}
        </Link>
      </li>,
    ];
  }
}

NavbarMessages.defaultProps = {
  messages: [],
};
