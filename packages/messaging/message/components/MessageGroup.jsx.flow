import React, { Component } from 'react';
import classNames from 'classnames';

import Avatar from '@uidu/avatar';

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
        <div className={classNames('position-relative p-3', {})}>
          <div className="media">
            <div className="d-none d-md-block">
              <Avatar
                src={messager.avatar.thumb}
                name={messager.name}
                withTooltip
              />
            </div>

            <div className="media-body ml-md-3" style={{ minWidth: 0 }}>
              <h6 className="text-heavy mb-0 d-flex align-items-center">
                <div className="d-md-none mr-2">
                  <Avatar
                    src={messager.avatar.thumb}
                    name={messager.name}
                    withTooltip
                    size="small"
                  />
                </div>
                {messager.name}
              </h6>
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
