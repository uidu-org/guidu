import Avatar from '@uidu/avatar';
import classNames from 'classnames';
import React, { Component } from 'react';

export default class MessageGroup extends Component {
  static defaultProps = {
    kind: 'message.create',
  };

  state = {
    editing: false,
  };

  render() {
    const { messages, messager, kind, children } = this.props;

    if (kind === 'message.create') {
      return (
        <div className={classNames('position-relative py-3 px-3 px-md-4', {})}>
          <div className="media align-items-end align-items-md-start">
            <Avatar
              src={messager.avatar.thumb}
              name={messager.name}
              withTooltip={false}
              // size="small"
            />
            <div className="media-body ml-3" style={{ minWidth: 0 }}>
              <p className="small mb-0 text-muted">{messager.name}</p>
              {this.props.children({ messages, messager })}
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
