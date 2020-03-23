import Avatar from '@uidu/avatar';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { MessageGroupProps } from '../types';

export default function MessageGroup({
  kind = 'message.create',
  isSelf = messager => false,
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
      <div className={classNames('position-relative py-3 px-3 px-xl-4', {})}>
        <div className="media align-items-end">
          <Avatar
            src={messager.avatar}
            name={messager.name}
            enableTooltip={false}
            size={mobileView ? 'small' : 'medium'}
          />
          <div
            className={classNames('media-body ml-2 ml-md-3', {})}
            style={{ minWidth: 0 }}
          >
            <p className="small mb-0 text-muted">{messager.name}</p>
            {children({ messages, messager, reverse })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative p-3">
      {messages.map(message => (
        <div key={message.id} className="text-center text-muted small">
          {message.messager.name} {message.body}
        </div>
      ))}
    </div>
  );
}
