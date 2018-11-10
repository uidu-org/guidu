import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { MessageCircle, X } from 'react-feather';
import ChatWindow from './ChatWindow';

export default class Launcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  handleClick = () => {
    const { handleClick } = this.props;
    if (handleClick !== undefined) {
      handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  };

  render() {
    const {
      colors,
      messages,
      newMessagesCount,
      messageList,
      onMessageWasSent,
      agentProfile,
      showEmoji,
    } = this.props;
    console.log(this.props);
    const { isOpen } = this.state;
    return (
      <div>
        <div />
        <button
          type="button"
          className={classNames('sc-launcher', {
            opened: isOpen,
          })}
          onClick={this.handleClick}
          style={{
            backgroundColor: colors.launcher.background,
            color: colors.launcher.color,
          }}
        >
          <MessageCount
            count={newMessagesCount}
            isOpen={isOpen}
            colors={colors}
          />
          <X strokeWidth={1} className="sc-open-icon" />
          <MessageCircle strokeWidth={1} className="sc-closed-icon" />
        </button>
        {isOpen && (
          <ChatWindow
            {...this.props}
            // new props
            messages={messages}
            messageRender={() => {}}
            colors={colors}
            // old props
            messageList={messageList}
            onUserInputSubmit={onMessageWasSent}
            agentProfile={agentProfile}
            isOpen={isOpen}
            onClose={this.handleClick}
          />
        )}
      </div>
    );
  }
}

const MessageCount = ({ count, isOpen, colors }) => {
  if (count === 0 || isOpen === true) {
    return null;
  }
  return (
    <div
      className="sc-new-messages-count"
      style={{
        backgroundColor: colors.badge.background,
        color: colors.badge.color,
      }}
    >
      {count}
    </div>
  );
};

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  colors: PropTypes.shape(PropTypes.obj),
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
  colors: {
    launcher: {
      background: '#4e8cff',
      color: '#ffffff',
    },
    badge: {
      background: '#ff4646',
      color: '#ffffff',
    },
  },
};
