import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
// import { autolinker, automentioner } from 'utils';

import MessagesAttachments from './MessageAttachments';

import StyledMessage from '../styled/Message';

export default class Message extends Component {
  state = {
    editing: false,
  };

  render() {
    const { message, children } = this.props;
    const { editing } = this.state;

    return (
      <StyledMessage className="message mt-2 hoverable position-relative">
        <small
          className="text-muted ml-2 d-hover position-absolute"
          style={{ right: '8px', bottom: '2px' }}
        >
          {moment(message.createdAt).format('HH:mm')}
        </small>
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
        {(message.attachments || []).length > 0 && (
          <MessagesAttachments attachments={message.attachments} />
        )}
        {children}
      </StyledMessage>
    );
  }
}
