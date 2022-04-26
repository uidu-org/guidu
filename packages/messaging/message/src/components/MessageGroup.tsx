import Avatar from '@uidu/avatar';
import React, { useMemo } from 'react';
import { MessageGroupProps } from '../types';

export default function MessageGroup({
  kind = 'message.create',
  isSelf = (messager) => false,
  mobileView,
  messager,
  messages,
  children,
}: MessageGroupProps) {
  const reverse = useMemo(() => {
    return !!isSelf(messager);
  }, [mobileView, messager]);

  if (kind === 'message.create') {
    return (
      <div tw="relative py-4 px-4 xl:px-6">
        <div tw="flex items-end">
          <Avatar
            src={messager.avatar}
            name={messager.name}
            enableTooltip={false}
            size={mobileView ? 'small' : 'medium'}
          />
          <div tw="flex flex-grow ml-3 min-w-0 flex-col">
            <p tw="text-gray-500 text-sm">{messager.name}</p>
            {children({ messages, messager, reverse })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div tw="p-4 relative">
      {messages.map((message) => (
        <div key={message.id} tw="text-center text-sm text-gray-500">
          {message.messager.name} {message.body}
        </div>
      ))}
    </div>
  );
}
