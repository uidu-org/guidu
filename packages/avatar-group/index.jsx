import React, { PureComponent } from 'react';
import classNames from 'classnames';
import classes from './index.module.scss';

export default class MembersAvatar extends PureComponent {
  renderMember = member => (
    <div className={classes['member-wrapper']}>
      <img
        key={member.id}
        alt={member.name}
        src={member.avatar.thumb}
        className={classes['member-avatar']}
      />
    </div>
  );

  renderMembers = members => {
    if (members.length === 0) {
      return (
        <span
          className="d-flex align-items-center bg-light text-groups justify-content-center rounded-circle flex-shrink-0 font-weight-bold small"
          style={{ width: '2rem', height: '2rem' }}
        >
          NA
        </span>
      );
    }

    if (members.length === 1) {
      return this.renderMember(members[0]);
    }

    return members.slice(0, 4).map(this.renderMember);
  };

  render() {
    const { members } = this.props;
    return (
      <div
        className={classNames(classes.wrapper, 'rounded-circle')}
        style={{
          width: '2rem',
          height: '2rem',
        }}
        data-number-of-thumbnails={members.length}
      >
        {this.renderMembers(members)}
      </div>
    );
  }
}
