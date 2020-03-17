import Tooltip from '@uidu/tooltip';
import React from 'react';
import { MessageCircle } from 'react-feather';

export default function Reply({ onReply }) {
  return (
    <Tooltip position="top" content="Commenta" delay={0}>
      <button
        className="btn btn-sm bg-white text-muted p-2 d-flex align-items-center"
        onClick={onReply}
      >
        <MessageCircle size={16} />
      </button>
    </Tooltip>
  );
}
