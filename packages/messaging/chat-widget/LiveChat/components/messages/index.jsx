import Message from '@uidu/message';
import Spinner from '@uidu/spinner';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import ReactChatView from 'react-chatview';
import { groupByDay } from 'utils';

export default class MessageList extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   this.scrollList.scrollTop = this.scrollList.scrollHeight;
  // }

  render() {
    const {
      messages,
      fetchMessages,
      messageable,
      kind,
      currentContact,
      conversation,
    } = this.props;
    if (!messages || messages.isFetching) {
      return (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      );
    }

    if (!conversation.id) {
      return <p>Ciao! Scrivici un messaggio, di solito rispondiamo presto</p>;
    }

    return (
      <div
        className="h-100" // commenting this will put messages down but no auto-.scroll
        style={{
          overflow: 'auto',
        }}
      >
        <ReactChatView
          onInfiniteLoad={() => {
            return new Promise((resolve, reject) => {
              resolve(
                fetchMessages(
                  messageable,
                  kind,
                  messages.messages[messages.messages.length - 1].id,
                ),
              );
            });
          }}
          shouldTriggerLoad={() => messages.hasMore}
          className="h-100 px-4 pt-0 pb-4"
          flipped
        >
          {groupByDay(messages.messages, null).map((messageGroup) => {
            let unreadMessages = 0;
            const todayMessages = messageGroup.values;
            return (
              <div key={messageGroup.key}>
                <div className="d-flex justify-content-center text-muted sticky-top small my-4">
                  {messageGroup.key}
                </div>
                {todayMessages.reverse().map((message, index) => {
                  if (message.unread) {
                    unreadMessages += 1;
                  }
                  const lastMessage =
                    index > 0 ? todayMessages[index - 1] : null;
                  let isNewMessager = true;
                  if (
                    lastMessage &&
                    lastMessage.messager.id === message.messager.id &&
                    moment(message.createdAt).diff(
                      lastMessage.createdAt,
                      'minutes',
                    ) <= 5
                  ) {
                    isNewMessager = false;
                  }

                  const toRender = [];

                  if (unreadMessages === 1) {
                    // this is the first unread, should throw the line
                    toRender.push(
                      <div
                        className={classNames(
                          'py-3 text-center position-relative',
                          {
                            'my-3': isNewMessager,
                          },
                        )}
                      >
                        <div
                          style={{ height: '1px', backgroundColor: '#3891a6' }}
                        />
                        <span
                          className="btn btn-sm bg-white py-1 text-groups position-absolute"
                          style={{ right: 0, top: 0 }}
                        >
                          <small>NEW</small>
                        </span>
                      </div>,
                    );
                    unreadMessages = 0;
                  }

                  toRender.push(
                    <Message
                      {...this.props}
                      messageable={messageable}
                      kind={kind}
                      key={message.id}
                      message={message}
                      index={index}
                      isSelf={
                        currentContact &&
                        message.messager.id === currentContact.id
                      }
                      isNewMessager={isNewMessager}
                    />,
                  );

                  return toRender;
                })}
              </div>
            );
          })}
        </ReactChatView>
      </div>
    );
  }
}
