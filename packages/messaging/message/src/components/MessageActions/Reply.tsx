import Button from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import React from 'react';
import { MessageCircle } from 'react-feather';

export default function Reply({ onReply }) {
  return (
    <Tooltip position="top" content="Commenta" delay={0}>
      <Button
        className="p-2 bg-white btn btn-sm text-muted d-flex align-items-center"
        onClick={onReply}
      >
        <MessageCircle size={16} />
      </Button>
    </Tooltip>
  );
}
