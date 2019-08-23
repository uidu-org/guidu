import AvatarGroup from '@uidu/avatar-group';
import React, { Component } from 'react';
import { Users } from 'react-feather';
import { defaultUsers } from '../../../../forms/select/examples-utils';
import { Trigger } from '../styled';
import { MembersProps } from '../types';

export default class Members extends Component<MembersProps> {
  static defaultProps = {
    label: 'Watching',
    members: defaultUsers,
  };

  render() {
    const { label, members } = this.props;
    console.log(this.props);

    return (
      <div className="d-flex align-items-center ml-2">
        <Trigger activeBg="#d0f0fd" className="btn">
          <Users strokeWidth={2} size={14} className="mr-2" />
          <span style={{ textTransform: 'initial' }}>{label}</span>
        </Trigger>
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={members}
          size="small"
        />
      </div>
    );
  }
}
