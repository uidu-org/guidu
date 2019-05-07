import Message, {
  MessageActionMore,
  MessageActionReactions,
  MessageActionReply,
  MessageActions,
  MessageGroup,
  MessageReactions,
} from '@uidu/message';
import MessagesForm from '@uidu/message-form';
import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import Day from '../styled/Day';
import { ChatWindowProps, ChatWindowState } from '../types';
import { groupByDay, groupByMessager, sortByDay } from '../utils';
import ReactChatView from './ChatView';

// import Loader from 'components/Loader';

export default class ChatWindow extends Component<
  ChatWindowProps,
  ChatWindowState
> {
  private scrollable: HTMLDivElement | null = null;
  private messageForm: React.RefObject<any> = React.createRef();

  static defaultProps = {
    betweenMinutes: 5,
    messageable: {},
    fetchMessages: () => Promise.resolve([]),
  };

  state = {
    replyTo: null,
  };

  replyDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({
      replyTo: null,
    });
  };

  reply = (e: React.MouseEvent, message: any) => {
    const { scrollable } = this;
    this.setState(
      {
        replyTo: message,
      },
      () => {
        scrollable.scroll
          ? scrollable.scroll({
              top: scrollable.scrollHeight,
              behavior: 'smooth',
            })
          : (scrollable.scrollTop = scrollable.scrollHeight);
        this.messageForm.current.focus();
      },
    );
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
    const { replyTo } = this.state;

    // if (!messages || messages.isFetching) {
    //   return (
    //     <div className="h-100 d-flex align-items-center justify-content-center">
    //       <Loader />
    //     </div>
    //   );
    // }

    const groupedByDay = groupByDay(sortByDay(messages.messages));
    return (
      <Media query={{ maxWidth: 768 }}>
        {matches => (
          <div
            className="feed d-flex flex-column justify-content-end"
            style={{ flex: '1 1 auto', minHeight: 0, minWidth: 0 }}
          >
            <ReactChatView
              onInfiniteLoad={() =>
                fetchMessages(
                  messageable,
                  messages.messages[messages.messages.length - 1].id,
                )
              }
              shouldTriggerLoad={() => messages.hasMore}
              returnScrollable={c => {
                this.scrollable = c;
              }}
              flipped
            >
              {Object.keys(groupedByDay).map(day => {
                const todayMessages = groupedByDay[day];
                return (
                  <Fragment key={day}>
                    <Day className="small text-muted py-3">
                      <div className="bg-white px-2">{day}</div>
                    </Day>
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
                              messages.reverse().map(message => (
                                <Message
                                  messageable={messageable}
                                  key={message.id}
                                  message={message}
                                  messager={messager}
                                  mentionables={mentionables}
                                  mobileView={matches}
                                  onReply={(e: React.MouseEvent) =>
                                    this.reply(e, message)
                                  }
                                >
                                  {({
                                    editing,
                                    setEditing,
                                    hovered,
                                    onDropdownChange,
                                  }) => [
                                    <MessageActions hovered={hovered}>
                                      <MessageActionReply
                                        onReply={(e: React.MouseEvent) =>
                                          this.reply(e, message)
                                        }
                                      />
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
            <MessagesForm
              {...otherProps}
              ref={this.messageForm}
              mentionables={mentionables}
              message={{
                messageable,
                replyTo,
              }}
              onReplyDismiss={this.replyDismiss}
              messageable={messageable}
            />
          </div>
        )}
      </Media>
    );
  }
}
