import React from 'react';
import { ErrorMessagesProps } from './types';

export default function ErrorMessages({ messages = [] }: ErrorMessagesProps) {
  return (
    <div className="invalid-feedback">
      {messages.map((message, key) => (
        <p className="mb-1" key={`input-error-${key}`}>
          {message}
        </p>
      ))}
    </div>
  );
}
