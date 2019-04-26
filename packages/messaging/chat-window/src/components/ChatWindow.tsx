import React, { Component, Fragment } from 'react';
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
import { ChatWindowType } from 'src/types';

// import Loader from 'components/Loader';

export default class ChatWindow extends Component<ChatWindowType> {
  static defaultProps = {
    betweenMinutes: 5,
    messageable: {},
    fetchMessages: () => {},
  };

  render() {
    const {
      messageable,
      fetchMessages,
      mentionables,
      betweenMinutes,
      actions,
      ...otherProps
    } = this.props;
    const { messages } = messageable;

    // if (!messages || messages.isFetching) {
    //   return (
    //     <div className="h-100 d-flex align-items-center justify-content-center">
    //       <Loader />
    //     </div>
    //   );
    // }

    const groupedByDay = groupByDay(sortByDay(messages.messages));
    return (
      <div className="feed d-flex flex-column justify-content-end h-100 flex-grow-1">
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
                <Fragment key={day}>
                  <div className="d-flex justify-content-center sticky-top small text-muted py-3">
                    {day}
                  </div>
                  {groupByMessager(todayMessages, betweenMinutes)
                    .reverse()
                    .map((messageGroup: any, index: number) => {
                      return (
                        <MessageGroup
                          key={`${day}-${index}`}
                          messager={messageGroup.messager}
                          messages={messageGroup.messages}
                          kind={messageGroup.kind}
                        >
                          {({
                            messager,
                            messages,
                          }: {
                            messager: any;
                            messages: any;
                          }) =>
                            messages.reverse().map((message: any) => (
                              <Message
                                key={message.id}
                                message={message}
                                messager={messager}
                                mentionables={mentionables}
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
                                      actions={actions({
                                        onDropdownChange,
                                        setEditing,
                                        editing,
                                        message,
                                      })}
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
                </Fragment>
              );
            })}
          </ReactChatView>
        </div>
        <MessagesForm
          {...otherProps}
          mentionables={mentionables}
          message={{}}
          messageable={messageable}
        />
      </div>
    );
  }
}
