import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { autolinker, automentioner } from 'utils';

import MessagesAttachments from './attachments';
import MessageActions from './actions';

import MessagesForm from './form';

// import './show.scss';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  autoMentioner = () => {
    let out = this.props.message.body;
    const regex = /(\[([^\]]+)])\(([^)]+)\)/;
    if (out && out.match(new RegExp(regex, 'gm'))) {
      Array.from(out.match(new RegExp(regex, 'gm'))).forEach(m => {
        const match = m.match(regex);
        out = out.replace(
          match[0],
          `<a href="#/tasks/${match[3]}" class="mention">${match[2]}</a>`,
        );
      });
    }
    return out;
  };

  render() {
    const { message, members, isNewMessager } = this.props;
    const { editing } = this.state;
    if (isNewMessager) {
      return (
        <div
          className={classNames(
            'message hoverable position-relative mt-4 mb-1',
            {
              'bg-light py-3 pr-3': editing,
            },
          )}
        >
          <div className="media" id={message.id}>
            <img
              className="mr-3 rounded-circle"
              style={{ width: '2.375rem', height: '2.375rem' }}
              alt={message.messager.name}
              src={message.messager.avatar.thumb}
            />
            <div className="media-body">
              <h6 className="text-heavy mb-0">
                {message.messager.name}
                <small className="text-muted ml-2">
                  {moment(message.createdAt).format('HH:mm')}
                </small>
              </h6>
              {this.state.editing ? (
                <div className="my-3">
                  <MessagesForm
                    {...this.props}
                    message={message}
                    onDismiss={() => this.setState({ editing: false })}
                    onSubmit={() => this.setState({ editing: false })}
                  />
                </div>
              ) : (
                <p
                  className="mb-0"
                  dangerouslySetInnerHTML={{
                    __html: autolinker.link(automentioner(message.body)),
                  }}
                />
              )}
              {message.attachments.length > 0 && (
                <MessagesAttachments attachments={message.attachments} />
              )}
            </div>
          </div>
          <MessageActions
            {...this.props}
            onEdit={() => this.setState({ editing: true })}
            message={message}
          />
        </div>
      );
    }

    return (
      <div
        className={classNames('message hoverable position-relative my-1', {
          'bg-light py-3 pr-3': editing,
        })}
      >
        <div className="media align-items-start" id={message.id}>
          <div className="d-hover text-center" style={{ flex: '0 0 3.265rem' }}>
            <small className="text-muted mr-2 my-1">
              {moment(message.createdAt).format('HH:mm')}
            </small>
          </div>
          <div className="media-body">
            {this.state.editing ? (
              <div className="my-3">
                <MessagesForm
                  {...this.props}
                  message={message}
                  onDismiss={() => this.setState({ editing: false })}
                  onSubmit={() => this.setState({ editing: false })}
                />
              </div>
            ) : (
              <p
                className="mb-0"
                dangerouslySetInnerHTML={{
                  __html: autolinker.link(automentioner(message.body)),
                }}
              />
            )}
            {message.attachments.length > 0 && (
              <MessagesAttachments attachments={message.attachments} />
            )}
          </div>
        </div>
        <MessageActions
          {...this.props}
          onEdit={() => this.setState({ editing: true })}
          message={message}
        />
      </div>
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
