import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import Avatar from '@uidu/avatar';
// import { autolinker, automentioner } from 'utils';

// import MessagesAttachments from './attachments';
import MessageActions from './MessageActions';
import Reactions from './MessageActions/Reactions';
import Reply from './MessageActions/Reply';
import Pin from './MessageActions/Pin';
import More from './MessageActions/More';

import StyledMessage from '../styled/Message';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { message, isNewMessager } = this.props;
    const { editing } = this.state;

    if (isNewMessager) {
      return (
        <StyledMessage
          className={classNames(
            'message hoverable position-relative mt-4 mb-1',
            {
              'bg-light py-3 pr-3': editing,
              'highlight-long': !!message.unread,
            },
          )}
        >
          <div className="media" id={message.id}>
            <Avatar
              src={message.messager.avatar.thumb}
              name={message.messager.name}
              withTooltip
            />
            <div className="media-body ml-3">
              <h6 className="text-heavy mb-0">
                {message.messager.name}
                <small className="text-muted ml-2">
                  {moment(message.createdAt).format('HH:mm')}
                </small>
              </h6>
              {/* {this.state.editing ? (
                <div className="my-3">
                  <MessagesForm
                    {...this.props}
                    message={message}
                    onDismiss={() => this.setState({ editing: false })}
                    onSubmit={() => this.setState({ editing: false })}
                  />
                </div>
              ) : ( */}
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  // __html: autolinker.link(automentioner(message.body)),
                  __html: message.body,
                }}
              />
              {/* )} */}
              {/* {message.attachments.length > 0 && (
                <MessagesAttachments attachments={message.attachments} />
              )} */}
            </div>
          </div>
          <MessageActions>
            <Reactions onClick={console.log} />
            <Reply onClick={console.log} />
            <Pin onPin={console.log} />
            <More
              message={message}
              actions={[
                {
                  name: 'Create a task',
                  link: '/',
                  onClick: () => {},
                },
                { name: 'Forward' },
                { name: 'Edit' },
                { name: 'Delete' },
              ]}
            />
          </MessageActions>
        </StyledMessage>
      );
    }

    return (
      <StyledMessage
        className={classNames('message hoverable position-relative my-1', {
          'bg-light py-3 pr-3': editing,
          'highlight-long': !!message.unread,
        })}
      >
        <div className="media align-items-start" id={message.id}>
          <div className="d-hover" style={{ flex: '0 0 3rem' }}>
            <small className="text-muted mr-2 my-1">
              {moment(message.createdAt).format('HH:mm')}
            </small>
          </div>
          <div className="media-body">
            {/* {editing ? (
              <div className="my-3">
                <MessagesForm
                  {...this.props}
                  message={message}
                  onDismiss={() => this.setState({ editing: false })}
                  onSubmit={() => this.setState({ editing: false })}
                />
              </div>
            ) : ( */}
            <p
              className="mb-0"
              dangerouslySetInnerHTML={{
                __html: message.body,
                // __html: autolinker.link(automentioner(message.body)),
              }}
            />
            {/* )} */}
            {/* {message.attachments.length > 0 && (
              <MessagesAttachments attachments={message.attachments} />
            )} */}
          </div>
        </div>
        <MessageActions
          {...this.props}
          onEdit={() => this.setState({ editing: true })}
          message={message}
        />
      </StyledMessage>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape(PropTypes.obj).isRequired,
  isNewMessager: PropTypes.bool,
};

Message.defaultProps = {
  isNewMessager: true,
};
