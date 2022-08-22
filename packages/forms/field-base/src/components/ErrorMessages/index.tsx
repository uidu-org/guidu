import React from 'react';
import { ErrorMessagesProps } from './types';

export default function ErrorMessages({ messages = [] }: ErrorMessagesProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div tw="mt-3 space-y-2">
      {messages.map(({ message, type, ref }) => (
        <p tw="text-sm text-red-600" key={`${ref.name}-${type}`}>
          {message}
        </p>
      ))}
    </div>
  );
}
