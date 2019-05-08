import React, { PureComponent } from 'react';
import { MessageCircle, X } from 'react-feather';

export default class MessageFormReplyTo extends PureComponent<any> {
  render() {
    const { replyTo, onReplyDismiss } = this.props;
    return (
      <div className="p-3 border-top d-flex align-items-center justify-content-center flex-shrink-0">
        <div style={{ minWidth: 0 }} className="flex-grow-1">
          <p className="mb-0">
            <MessageCircle size={14} className="mr-2" />
            <span>
              In risposta a <b>{replyTo.messager.name}</b>
            </span>
          </p>
          <p className="mb-0 text-muted text-truncate">{replyTo.body}</p>
        </div>
        <button
          type="button"
          className="ml-3 btn btn-sm d-flex flex-shrink-0"
          onClick={onReplyDismiss}
        >
          <X size={16} />
        </button>
      </div>
    );
  }
}
