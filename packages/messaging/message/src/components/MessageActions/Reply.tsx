import Tooltip from '@uidu/tooltip';
import React, { Component } from 'react';
import { MessageCircle } from 'react-feather';

export default class Reply extends Component<any> {
  render() {
    const { onReply } = this.props;
    return (
      <Tooltip position="top" content="Commenta" delay={0}>
        <button
          className="btn btn-sm bg-white border py-1 px-3 d-flex align-items-center"
          onClick={onReply}
        >
          <MessageCircle size={16} />
        </button>
      </Tooltip>
    );
  }
}
