import React from 'react';
import ReactChatView from 'react-chatview';

import Message, {
  MessageGroup,
  MessageActions,
  MessageActionReactions,
  MessageActionReply,
  MessageActionMore,
  MessageReactions,
} from '@uidu/message';
import MessagesForm from '@uidu/message-form';
import { sortByDay, groupByDay, groupByMessager } from '../utils';

// import Loader from 'components/Loader';

function MessagesRender({
  fetchMessages,
  messageable,
  currentMember,
  ...otherProps
}) {
  const { messages } = messageable;
  if (!messages || messages.isFetching) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Loader />
      </div>
    );
  }

  const groupedByDay = groupByDay(sortByDay(messages.messages));

  return (
    <div
      className="h-100" // commenting this will put messages down but no auto-.scroll
      style={{
        overflow: 'auto',
      }}
    >
      <ReactChatView
        onInfiniteLoad={() =>
          fetchMessages(
            messageable,
            messages.messages[messages.messages.length - 1].id,
          )
        }
        shouldTriggerLoad={() => messages.hasMore}
        className="h-100"
        flipped
      >
        {Object.keys(groupedByDay).map(day => {
          const todayMessages = groupedByDay[day];
          return (
            <div key={day}>
              <div className="d-flex justify-content-center sticky-top small text-muted py-3">
                {day}
              </div>
              {groupByMessager(todayMessages)
                .reverse()
                .map((messageGroup, index) => {
                  return (
                    <MessageGroup
                      key={`${day}-${index}`}
                      messager={messageGroup.messager}
                      messages={messageGroup.messages}
                      kind={messageGroup.kind}
                    >
                      {({ messager, messages }) =>
                        messages.reverse().map(message => (
                          <Message
                            key={message.id}
                            message={message}
                            messager={messager}
                          >
                            {({
                              editing,
                              setEditing,
                              hovered,
                              onDropdownChange,
                            }) => [
                              <MessageActions hovered={hovered}>
                                <MessageActionReply />
                                <MessageActionReactions
                                  onOpenChange={onDropdownChange}
                                  onClick={console.log}
                                />
                                <MessageActionMore
                                  onOpenChange={onDropdownChange}
                                  actions={[
                                    { name: 'Edit', onClick: setEditing },
                                    // { name: 'Pin' },
                                    { name: 'Forward' },
                                    { name: 'Copy' },
                                    { name: 'Set reminder' },
                                  ]}
                                />
                              </MessageActions>,
                              message.reactions && (
                                <MessageReactions
                                  reactions={message.reactions}
                                />
                              ),
                            ]}
                          </Message>
                        ))
                      }
                    </MessageGroup>
                  );
                })}
            </div>
          );
        })}
      </ReactChatView>
    </div>
  );
}

export default function Messages({
  messageable,
  organizationMembers,
  fetchMessages,
  ...otherProps
}) {
  return (
    <div className="feed d-flex flex-column justify-content-end h-100">
      <MessagesRender
        {...otherProps}
        organizationMembers={organizationMembers}
        fetchMessages={fetchMessages}
        messageable={messageable}
      />
      <MessagesForm
        {...otherProps}
        message={{}}
        messageable={messageable}
        organizationMembers={organizationMembers}
      />
    </div>
  );
}

// Messages.propTypes = {
//   organizationMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
//   messageable: PropTypes.shape(PropTypes.obj).isRequired,
//   fetchMessages: PropTypes.func.isRequired,
// };
