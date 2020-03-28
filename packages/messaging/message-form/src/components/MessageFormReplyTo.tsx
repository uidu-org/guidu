import React from 'react';
import { MessageCircle, X } from 'react-feather';

export default function MessageFormReplyTo({ replyTo, onReplyDismiss }) {
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
        onClick={(e) => {
          e.preventDefault();
          onReplyDismiss();
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
