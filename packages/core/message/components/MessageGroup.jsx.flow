import React, { Component } from 'react';
import classNames from 'classnames';

import Avatar from '@uidu/avatar';
import Message from './Message';

export default class MessagerGroup extends Component {
  static defaultProps = {
    isNewMessager: true,
  };

  state = {
    editing: false,
  };

  render() {
    const { messages, messager, children } = this.props;

    return (
      <div className={classNames('position-relative p-3 border-top', {})}>
        <div className="media">
          <Avatar
            src={messager.avatar.thumb}
            name={messager.name}
            withTooltip
          />
          <div className="media-body ml-3" style={{ minWidth: 0 }}>
            <h6 className="text-heavy mb-0">{messager.name}</h6>
            {this.props.children({ messages, messager })}
          </div>
        </div>
      </div>
    );
  }
}
