import Drawer from '@uidu/drawer';
import MessageRenderer from '@uidu/message-renderer';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { MessageCircle } from 'react-feather';
import { TouchableOpacity, Vibration, View } from 'react-native';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { Message } from '../../types';
import MessagesAttachments from '../MessageAttachments';
import { StyledMobileViewMessage } from './styled';

const SwipeableMessage = ({
  onDrag,
  onDragEnd,
  onReply,
  viewActions,
  children,
}) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useDrag(({ distance, down, delta }) => {
    if (delta[0] > 150) {
      onDrag(xy);
      onReply();
    }
    set({ xy: down ? delta : [0, 0] });
  });
  // {
  //   onDrag: ({ delta }) => {
  //     if (delta[0] > 0) {
  //       onDrag(xy);
  //       // activate only when scrolling right
  //       if (delta[0] > 150) {
  //         set({ xy: [150, 0] });
  //       } else {
  //         set({ xy: delta });
  //       }
  //     }
  //   },
  //   onDragEnd: ({ delta }) => {
  //     if (delta[0] > 150) {
  //       Vibration.vibrate([0, 1000, 2000, 3000]);
  //       onReply();
  //     }
  //     onDragEnd();
  //     set({ xy: [0, 0] });
  //   },
  // },
  // { event: { capture: true, passive: false } },

  return (
    <animated.div
      {...(!viewActions && bind())}
      style={{
        transform: xy.interpolate(x => `translateX(${x}px)`),
      }}
    >
      {children}
    </animated.div>
  );
};

export default class MobileViewMessage extends Component<
  Message,
  {
    viewDetails: boolean;
    viewActions: boolean;
    viewReply: boolean;
  }
> {
  static defaultProps = {
    onMessageReply: () => {},
    onMessageDrag: () => {},
    onMessageDragEnd: () => {},
  };

  state = {
    viewDetails: false,
    viewActions: false,
    viewReply: false,
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      viewDetails: !prevState.viewDetails,
    }));
  };

  toggleActions = () => {
    this.setState(
      prevState => ({
        viewActions: !prevState.viewActions,
      }),
      () => Vibration.vibrate([0, 1000, 2000, 3000]),
    );
  };

  onDrag = () => {
    this.setState(
      {
        viewDetails: false,
        viewReply: true,
      },
      () => {
        this.props.onMessageDrag();
      },
    );
  };

  onDragEnd = () => {
    this.setState(
      {
        viewReply: false,
      },
      () => {
        this.props.onMessageDragEnd();
      },
    );
  };

  onReply = () => {
    this.props.onReply();
  };

  render() {
    const { message, children, showAttachments, reverse } = this.props;
    const { viewDetails, viewActions, viewReply } = this.state;

    return (
      <Fragment>
        <div
          className={classNames('d-flex align-items-center', {
            'justify-content-end': reverse,
          })}
          style={{ minWidth: 0 }}
        >
          {viewReply && <MessageCircle className="mr-2 position-absolute" />}
          {reverse ? (
            <StyledMobileViewMessage reverse={reverse} className="message mt-1">
              <div className="mb-0">
                <MessageRenderer tagName="fragment" content={message.body} />
              </div>
            </StyledMobileViewMessage>
          ) : (
            <SwipeableMessage
              viewActions={viewActions}
              onDrag={this.onDrag}
              onDragEnd={this.onDragEnd}
              onReply={this.onReply}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={this.toggleActions}
                onPress={this.toggleDetails}
              >
                <View>
                  <StyledMobileViewMessage
                    reverse={reverse}
                    className="message mt-1"
                  >
                    <div className="mb-0">
                      <MessageRenderer
                        tagName="fragment"
                        content={message.body}
                      />
                    </div>
                  </StyledMobileViewMessage>
                </View>
              </TouchableOpacity>
            </SwipeableMessage>
          )}
        </div>
        {(message.attachments || []).length > 0 && showAttachments && (
          <MessagesAttachments
            attachments={message.attachments}
            className={reverse ? 'text-right' : undefined}
          />
        )}
        {viewDetails && (
          <p className="text-muted ml-1 mt-1 mb-0 small">
            {moment(message.createdAt).format('HH:mm')}
          </p>
        )}
        {/* {viewDetails && (
          <p className="text-muted my-2 small">Visualizzato da tutti</p>
        )} */}
        <Drawer
          isOpen={viewActions}
          onClose={this.toggleActions}
          origin="bottom"
          size="medium"
        >
          {children &&
            children({
              hovered: true,
            })}
        </Drawer>
      </Fragment>
    );
  }
}
