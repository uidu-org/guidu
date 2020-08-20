import React from 'react';
import { MessageProps } from '../types';

export default function MessageLog({ message }: { message: MessageProps }) {
  return (
    <div className="position-relative py-3">
      <div className="text-center text-muted small">
        {message.messager.name} {message.body}
      </div>
    </div>
  );
}
