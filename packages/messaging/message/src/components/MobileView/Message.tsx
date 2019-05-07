import Drawer from '@uidu/drawer';
import MessageRenderer from '@uidu/message-renderer';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import { MessageCircle } from 'react-feather';
import { TouchableOpacity, Vibration } from 'react-native';
import { animated, useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { Message } from '../../types';
import MessagesAttachments from '../MessageAttachments';
import { StyledMobileViewMessage } from './styled';

const SwipeableMessage = ({ onDrag, onDragEnd, children }) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(
    {
      onDrag: ({ delta, local }) => {
        onDrag(xy);
        if (delta[0] > 0) {
          // activate only when scrolling right
          if (delta[0] > 150) {
            set({ xy: [150, 0] });
          } else {
            set({ xy: delta });
          }
        }
      },
      onDragEnd: ({ delta }) => {
        if (delta[0] > 150) {
          Vibration.vibrate([0, 1000, 2000, 3000]);
          onDragEnd();
        }
        set({ xy: [0, 0] });
      },
    },
    { event: { passive: false } },
  );

  return (
    <animated.div
      {...bind()}
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
  state = {
    viewDetails: false,
    viewActions: false,
    viewReply: false,
  };

  toggleDetails = () => {
    this.setState(
      prevState => ({
        viewDetails: !prevState.viewDetails,
      })
    );
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
    this.setState({
      viewActions: false,
      viewDetails: false,
      viewReply: true,
    });
  };

  onDragEnd = e => {
    this.props.onReply(e);
  };

  render() {
    const { message, children, showAttachments } = this.props;
    const { viewDetails, viewActions, viewReply } = this.state;

    return (
      <Fragment>
        {viewDetails && (
          <p className="text-muted my-2 small">
            {moment(message.createdAt).format('HH:mm')}
          </p>
        )}
        <div className="d-flex align-items-center">
          {viewReply && <MessageCircle className="mr-2 position-absolute" />}
          <SwipeableMessage onDrag={this.onDrag} onDragEnd={this.onDragEnd}>
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={this.toggleActions}
              onPress={this.toggleDetails}
            >
              <StyledMobileViewMessage className="message mt-1">
                <div className="mb-0">
                  <MessageRenderer tagName="fragment" content={message.body} />
                </div>
              </StyledMobileViewMessage>
            </TouchableOpacity>
          </SwipeableMessage>
        </div>
        {(message.attachments || []).length > 0 && showAttachments && (
          <MessagesAttachments attachments={message.attachments} />
        )}
        {viewDetails && (
          <p className="text-muted my-2 small">Visualizzato da tutti</p>
        )}
        <Drawer
          isOpen={viewActions}
          onClose={this.toggleActions}
          origin="bottom"
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
