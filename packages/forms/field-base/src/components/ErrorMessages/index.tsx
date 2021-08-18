import React from 'react';
import { ErrorMessagesProps } from './types';

export default function ErrorMessages({ messages = [] }: ErrorMessagesProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="invalid-feedback">
      {messages.map((message, key) => (
        <p tw="mt-2 text-sm text-red-600" key={`input-error-${key}`}>
          {message}
        </p>
      ))}
    </div>
  );
}
