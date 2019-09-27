import Avatar from '@uidu/avatar';
import classNames from 'classnames';
import React, { Component } from 'react';
import { MessageGroupProps } from '../types';

export default class MessageGroup extends Component<MessageGroupProps> {
  static defaultProps = {
    kind: 'message.create',
    isSelf: messager => false,
  };

  reverse = () => {
    const { mobileView, messager, isSelf } = this.props;
    if (!mobileView) {
      return false;
    }

    return !!isSelf(messager);
  };

  render() {
    const { messages, messager, kind, children, mobileView } = this.props;

    const reverse = this.reverse();

    if (kind === 'message.create') {
      return (
        <div className={classNames('position-relative py-3 px-3 px-xl-4', {})}>
          <div className="media align-items-end align-items-md-start">
            {!reverse && (
              <Avatar
                src={messager.avatar.thumb}
                name={messager.name}
                enableTooltip={false}
                size={mobileView ? 'small' : 'medium'}
              />
            )}
            <div
              className={classNames('media-body', {
                'ml-2 ml-md-3': !reverse,
              })}
              style={{ minWidth: 0 }}
            >
              {!reverse && (
                <p className="small mb-0 text-muted">{messager.name}</p>
              )}
              {children({ messages, messager, reverse })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="position-relative p-3">
        {messages.map(message => (
          <div key={message.id} className="text-center text-muted small">
            {message.messager.name} {message.body}
          </div>
        ))}
      </div>
    );
  }
}
