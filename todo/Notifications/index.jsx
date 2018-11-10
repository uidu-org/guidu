import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import './index.scss';

export default class UiduNotification extends Component {
  renderActions = () => {
    return (
      <object className="btn-group" style={{ marginTop: 8 }}>
        {this.props.content.actions.map(function(elem, index) {
          return (
            <a key={index} className="btn btn-xs" href={elem.href}>
              {elem.label}
            </a>
          );
        })}
      </object>
    );
  };

  getRecipient = () => {
    const { currentMember, currentOrganization, notification } = this.props;
    if (notification.organization) {
      if (currentOrganization) {
        return false;
      }
      return notification.organization;
    }
    if (currentOrganization) {
      return currentMember;
    }
    return false;
  };

  getNotificationBodyDependingOnActor = () => {
    const { notification } = this.props;
    const { kind, content } = notification;
    const recipient = this.getRecipient();
    let meOrOther = 'me';

    if (recipient) {
      if (kind === 'follow.me') {
        meOrOther = recipient.klass === 'User' ? 'me' : 'other';
      } else {
        meOrOther = 'other';
      }
    } else {
      meOrOther = 'me';
    }

    const { localeProps } = content;
    if (meOrOther === 'other') {
      localeProps.otherName = recipient.name;
    }
    return window.I18n.t([content.localeKey, meOrOther].join('.'), localeProps);
  };

  render() {
    const { notification } = this.props;
    const { content } = notification;

    return (
      <a
        className={classNames('dropdown-item notification', {
          unread: !notification.checkedAt,
        })}
        style={{ whiteSpace: 'normal' }}
        // onClick={this.navigateOrSwitch}
        href={notification.content.link}
      >
        <div className="media align-items-center">
          {notification.actorable ? (
            <img
              style={{ width: '3rem', height: '3rem' }}
              alt={notification.actorable.name}
              src={notification.actorable.avatar.default}
              className={`mr-3 ${
                notification.actorable.klass === 'User'
                  ? 'rounded-circle'
                  : 'rounded'
              }`}
            />
          ) : (
            <img
              className="card-avatar rounded-circle media-object"
              src="/images/apps/contacts.png"
            />
          )}
          <div className="media-body">
            <p
              className="mb-0 small"
              dangerouslySetInnerHTML={{
                __html: this.getNotificationBodyDependingOnActor(),
              }}
            />
            <p className="small text-muted mb-0">
              {moment(notification.createdAt).calendar(null, {
                sameElse: 'lll',
              })}
            </p>
            {true && content.actions && this.renderActions()}
          </div>
        </div>
      </a>
    );
  }
}
