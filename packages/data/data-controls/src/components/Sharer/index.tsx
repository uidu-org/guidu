import { ButtonItem, MenuGroup } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { Component } from 'react';
import { Share } from 'react-feather';
import { Trigger } from '../../styled';

export default class Sharer extends Component<any> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const { onChange } = this.props;
    return (
      <Popup
        trigger={(triggerProps) => (
          <Trigger
            activeBg="#fee2d5"
            className="btn"
            active={false}
            {...triggerProps}
          >
            <Share strokeWidth={2} size={14} />
          </Trigger>
        )}
        position="bottom left"
        content={() => (
          <MenuGroup>
            <ButtonItem>Create a shareable view</ButtonItem>
            <ButtonItem>Create a form view</ButtonItem>
          </MenuGroup>
        )}
      />
    );
  }
}
