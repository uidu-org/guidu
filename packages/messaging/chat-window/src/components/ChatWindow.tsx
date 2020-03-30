import Message, {
  MessageActionMore,
  MessageActionReactions,
  MessageActionReply,
  MessageActions,
  MessageGroup,
} from '@uidu/message';
import MessagesForm from '@uidu/message-form';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Media from 'react-media';
import Day from '../styled/Day';
import { ChatWindowProps } from '../types';
import { groupByDay, groupByMessager, sortByDay } from '../utils';
import ReactChatView from './ChatView';

function ChatWindow({
  betweenMinutes = 5,
  formActions = [],
  formAttachments = [],
  actions,
  onInfiniteLoad,
  hasMore,
  messages,
  mentionables,
  isSelf,
  forwardedRef,
  itemableProvider,
  ...rest
}: ChatWindowProps) {
  const scrollable: React.RefObject<HTMLDivElement> = useRef(null);
  const messageForm: React.RefObject<any> = useRef(null);

  useImperativeHandle(forwardedRef, () => scrollable.current);

  const [replyTo, setReplyTo] = useState(null);

  const reply = (message: any) => {
    setReplyTo(message);
    setTimeout(() => {
      // scrollable.current.scroll
      //   ? scrollable.current.scroll({
      //       top: scrollable.current.scrollHeight,
      //       behavior: 'smooth',
      //     })
      //   : (scrollable.current.scrollTop = scrollable.current.scrollHeight);
      messageForm.current.focus();
    }, 100);
  };

  const replyDismiss = () => {
    setReplyTo(null);
  };

  // if (!messages || messages.isFetching) {
  //   return (
  //     <div className="h-100 d-flex align-items-center justify-content-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  const groupedByDay = useMemo(() => groupByDay(sortByDay(messages)), [
    messages,
  ]);

  return (
    <Media query={{ maxWidth: 768 }}>
      {(matches) => (
        <div
          className="feed d-flex flex-column justify-content-end"
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <ReactChatView
            ref={scrollable}
            onInfiniteLoad={onInfiniteLoad}
            // onInfiniteLoad={() =>
            //   fetchMessages(
            //     messages.messages[messages.messages.length - 1].id,
            //   )
            // }
            shouldTriggerLoad={() => hasMore}
            flipped
          >
            {Object.keys(groupedByDay).map((day) => {
              const todayMessages = groupedByDay[day];
              return (
                <>
                  <Day className="small text-muted">
                    <div className="px-2">{day}</div>
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
                          mobileView={matches}
                          isSelf={isSelf}
                        >
                          {({
                            messager,
                            messages,
                            reverse,
                          }: {
                            messager: any;
                            messages: any;
                            reverse: boolean;
                          }) =>
                            messages.reverse().map((message) => (
                              <Message
                                reverse={reverse}
                                key={message.id}
                                message={message}
                                messager={messager}
                                mentionables={mentionables}
                                mobileView={matches}
                                scrollable={scrollable}
                                //  onMessageDrag={this.freezeScroll}
                                //  onMessageDragEnd={
                                //    this.unfreezeScroll
                                //  }
                                onReply={() => reply(message)}
                                itemableProvider={itemableProvider}
                              >
                                {({
                                  editing,
                                  setEditing,
                                  hovered,
                                  onDropdownChange,
                                }) => (
                                  <>
                                    <MessageActions hovered={hovered}>
                                      <MessageActionReactions
                                        onOpenChange={onDropdownChange}
                                        onClick={console.log}
                                      />
                                      <MessageActionReply
                                        onReply={() => reply(message)}
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
                                    </MessageActions>
                                  </>
                                )}
                              </Message>
                            ))
                          }
                        </MessageGroup>
                      );
                    })}
                </>
              );
            })}
          </ReactChatView>
          <MessagesForm
            {...rest}
            ref={messageForm}
            actions={formActions}
            attachments={formAttachments}
            mentionables={mentionables}
            message={{
              replyTo,
            }}
            onReplyDismiss={replyDismiss}
          />
        </div>
      )}
    </Media>
  );
}

export default forwardRef((props: ChatWindowProps, ref) => (
  <ChatWindow {...props} forwardedRef={ref} />
));
