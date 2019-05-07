import React from 'react';
import { Message } from '../types';

export default ({ message }: { message: Message }) => (
  <div className="position-relative py-3">
    <div className="text-center text-muted small">
      {message.messager.name} {message.body}
    </div>
  </div>
);
