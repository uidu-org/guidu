import AvatarGroup from '@uidu/avatar-group';
import React, { Component } from 'react';
import { Users } from 'react-feather';
import { Trigger } from '../styled';
import { MembersProps } from '../types';

export default class Members extends Component<MembersProps> {
  static defaultProps = {
    label: 'Watching colleagues',
    members: [],
  };

  render() {
    const { label, members } = this.props;

    return (
      <div tw="flex items-center">
        <Trigger
          activeBg="#d0f0fd"
          iconBefore={<Users strokeWidth={2} size={14} />}
        >
          {label}
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
