import React, { Component } from 'react';
import { Bell } from 'react-feather';
import { ActionCable } from 'react-actioncable-provider';
import Notification from 'components/Notifications';

export default class NavbarNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getUnseenNotificationIds = () => {
    const { notifications } = this.props;
    return notifications.filter(n => !n.seenAt).map(n => n.id);
  };

  onReceived = notification => {
    const { addNotification } = this.props;
    // TODO: Cosa mostrare e soprattutto mandare Push solo se inattivo su schermata
    // Push.create(notification.kind, {
    //   tag: notification.id,
    //   link: notification.content.link,
    //   body: notification.content.text.me,
    //   icon: notification.content.image,
    // });
    addNotification(notification);
  };

  handleClick = e => {
    console.log('clicked');
    e.preventDefault();
    const { seeNotifications } = this.props;
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
    if (this.getUnseenNotificationIds().length > 0) {
      return seeNotifications(this.getUnseenNotificationIds());
    }
    return null;
  };

  render() {
    const { notifications, currentMember, currentUser } = this.props;

    return [
      currentUser && (
        <ActionCable
          channel={{
            channel: 'NotificationsChannel',
            notifiable_id: currentMember ? currentMember.id : currentUser.id,
            notifiable_type: currentMember ? 'Contact' : 'User',
          }}
          onReceived={this.onReceived}
          key="notification-cable"
        />
      ),
      <li className="nav-item dropdown" key="notification-dropdown">
        <a
          className="nav-link mx-2 d-flex align-items-center justify-content-center position-relative"
          data-toggle="dropdown"
          data-target="#"
          aria-expanded="false"
          onClick={this.handleClick}
        >
          <Bell size={22} strokeWidth={1} stroke="currentColor" />
          {this.getUnseenNotificationIds().length > 0 && (
            <span
              className="badge badge-pill badge-light position-absolute"
              style={{
                top: 4,
                right: 0,
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 7,
                paddingRight: 7,
                verticalAlign: 'middle',
              }}
            >
              {this.getUnseenNotificationIds().length}
            </span>
          )}
        </a>
        <div
          className="dropdown-menu dropdown-menu-right py-0"
          style={{ minWidth: '24rem' }}
        >
          <div className="dropdown-header d-flex justify-content-between border-bottom">
            <span>Notifiche</span>
            <span>
              <a href="#">{window.I18n.t('views.notifications.settings')}</a>{' '}
              <span> · </span>{' '}
              <a href="#">{window.I18n.t('views.notifications.settings')}</a>
            </span>
          </div>
          <div style={{ height: '40vh', overflow: 'auto' }}>
            {notifications.map(notification => (
              <Notification
                key={notification.id}
                notification={notification}
                content={notification.content}
              />
            ))}
          </div>
          <a className="dropdown-header border-top text-center" href="#">
            {window.I18n.t('utils.actions.see_all.female')}
          </a>
        </div>
      </li>,
    ];
  }
}
