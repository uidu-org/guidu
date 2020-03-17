import React from 'react';
import { Message } from '../types';

export default function MessageLog({ message }: { message: Message }) {
  return (
    <div className="position-relative py-3">
      <div className="text-center text-muted small">
        {message.messager.name} {message.body}
      </div>
    </div>
  );
}
