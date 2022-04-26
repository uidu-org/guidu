import loadable from '@loadable/component';
import MessageForm from '@uidu/message-form';
import MessageRenderer from '@uidu/message-renderer';
import Tooltip from '@uidu/tooltip';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import StyledMessage, { StyledMessageEmoji } from '../styled/Message';
import { MessageProps } from '../types';
import { isOnlyEmojis } from '../utils';

const MessagesAttachments = loadable(() => import('./MessageAttachments'));
const MessageReactions = loadable(() => import('./MessageReactions'));

const MESSAGE_WRAPPER_MAX_WIDTH = 66;
const MESSAGE_BODY_MAX_WIDTH = 55;

const MessageWrapper = styled.div`
  /* width: 100%; */
  max-width: ${MESSAGE_WRAPPER_MAX_WIDTH}%;
  min-width: 0;
`;

const MessageBodyWrapper = styled.div<{ reverse: boolean }>`
  background: ${({ reverse }) => (reverse ? '#dbeafd' : '#f1f2f3')};
  border-radius: 0.35rem;
  padding: 0.5rem 0.75rem;
  width: fit-content;
  /* max-width: ${(MESSAGE_BODY_MAX_WIDTH / MESSAGE_WRAPPER_MAX_WIDTH) *
  100}%; */
`;

const MessageReplyToWrapper = styled.p`
  padding: 0rem 0.75rem;
  border-left: 2px solid #adb5bd57;
  margin: 0.5rem 0;
`;

export default function Message({
  showAttachments = true,
  message,
  children,
  mobileView,
  reverse,
  itemableProvider: Itemable,
  scrollable,
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

  return (
    <>
      <StyledMessage
        tw="mt-1 relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(isDropdownOpen)}
      >
        <Tooltip
          tag={MessageWrapper}
          content={moment(message.createdAt).format('LL HH:mm')}
          position="left"
          delay={0}
        >
          <>
            {editing ? (
              <MessageForm
                {...rest}
                attachments={message.attachments}
                message={message}
                onDismiss={() => setEditing(false)}
                onSubmit={() => setEditing(false)}
              />
            ) : (
              <>
                <MessageBodyWrapper reverse={reverse}>
                  <div className="mb-0">
                    {message.replyTo && (
                      <MessageReplyToWrapper className="small text-muted">
                        {message.replyTo.body}
                      </MessageReplyToWrapper>
                    )}
                    <MessageRenderer
                      tagName="fragment"
                      content={message.body}
                    />
                  </div>
                </MessageBodyWrapper>
                {message.itemable && <Itemable itemable={Itemable} />}
                {(message.attachments || []).length > 0 && showAttachments && (
                  <MessagesAttachments
                    scrollable={scrollable}
                    attachments={message.attachments.map((attachment) => ({
                      ...attachment,
                      author: message.messager,
                    }))}
                  />
                )}
              </>
            )}
            {message.reactions && (
              <MessageReactions reactions={message.reactions} />
            )}
          </>
        </Tooltip>
        {!editing &&
          children &&
          children({
            editing,
            hovered,
            onDropdownChange: keepActionsVisible,
            setEditing: setEditing,
          })}
      </StyledMessage>
    </>
  );
}
