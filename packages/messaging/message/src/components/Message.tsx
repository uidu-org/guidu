import MessageForm from '@uidu/message-form';
import MessageRenderer from '@uidu/message-renderer';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import StyledMessage, { StyledMessageEmoji } from '../styled/Message';
import { Message as MessageProps } from '../types';
import { isOnlyEmojis } from '../utils';
import MessagesAttachments from './MessageAttachments';
import MessageReactions from './MessageReactions';
import MobileViewMessage from './MobileView/Message';

export default function Message({
  showAttachments = true,
  message,
  children,
  mobileView,
  reverse,
  ...rest
}: MessageProps) {
  const [editing, setEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const keepActionsVisible = ({ isOpen }) => {
    setIsDropdownOpen(isOpen);
  };
  if (isOnlyEmojis(message.body)) {
    return (
      <StyledMessageEmoji className={classNames('message mt-2', {})}>
        <span>{message.body}</span>
      </StyledMessageEmoji>
    );
  }

  if (mobileView) {
    return (
      <MobileViewMessage
        message={message}
        reverse={reverse}
        showAttachments={showAttachments}
        {...rest}
      >
        {children}
      </MobileViewMessage>
    );
  } else {
    return (
      <>
        <StyledMessage
          className="message mt-1 hoverable position-relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(isDropdownOpen)}
        >
          <div
            style={{
              background: reverse ? '#dbeafd' : '#f1f2f3',
              borderRadius: '0.35rem',
              padding: '0.5rem 0.75rem',
              width: 'auto',
              maxWidth: '55%',
            }}
          >
            {editing ? (
              <MessageForm
                {...rest}
                message={message}
                onDismiss={() => setEditing(false)}
                onSubmit={() => setEditing(false)}
              />
            ) : (
              <>
                <small
                  className="text-muted ml-2 d-hover position-absolute"
                  style={{
                    // backgroundColor: '#f8f9fa',
                    right: '6px',
                    bottom: '2px',
                    padding: '0 0 0 1rem',
                  }}
                >
                  {moment(message.createdAt).format('HH:mm')}
                </small>
                <div className="mb-0">
                  {message.replyTo && (
                    <p
                      className="small text-muted"
                      style={{
                        padding: '0rem .75rem',
                        borderLeft: '2px solid #adb5bd57',
                        margin: '0.5rem 0',
                      }}
                    >
                      {message.replyTo.body}
                    </p>
                  )}
                  <MessageRenderer tagName="fragment" content={message.body} />
                </div>
              </>
            )}
          </div>
          {!editing &&
            children &&
            children({
              editing,
              hovered,
              onDropdownChange: keepActionsVisible,
              setEditing: setEditing,
            })}
        </StyledMessage>
        {(message.attachments || []).length > 0 && showAttachments && (
          <MessagesAttachments
            attachments={message.attachments.map((attachment) => ({
              ...attachment,
              author: message.messager,
            }))}
          />
        )}
        {message.reactions && (
          <MessageReactions reactions={message.reactions} />
        )}
      </>
    );
  }
}
