import Button from '@uidu/button';
import { Label } from '@uidu/field-base';
import Item, { ItemGroup } from '@uidu/item';
import React, { PureComponent } from 'react';
import DropList from '../src';

type State = {
  eventResult: string;
  isOpen: boolean;
};

export default class BasicExample extends PureComponent<void, State> {
  state = {
    eventResult: 'Click into and out of the content to trigger event handlers',
    isOpen: false,
  };

  onKeyDown = () => {
    this.setState({
      eventResult: 'onKeyDown called',
    });
  };

  onClick = () => {
    this.setState({
      eventResult: 'onClick called',
      isOpen: !this.state.isOpen,
    });
  };
  onOpenChange = () => {
    this.setState({
      eventResult: 'onOpenChange called',
      isOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Label label="With event handlers" />
        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          {this.state.eventResult}
        </div>
        <DropList
          appearance="default"
          position="right top"
          isTriggerNotTabbable
          onOpenChange={this.onOpenChange}
          onClick={this.onClick}
          isOpen={this.state.isOpen}
          trigger={<Button>...</Button>}
        >
          <ItemGroup title="Australia">
            <Item href="//atlassian.com" target="_blank">
              Sydney
            </Item>
            <Item isHidden>Hidden item</Item>
            <Item isDisabled>Brisbane</Item>
            <Item>Melbourne</Item>
          </ItemGroup>
        </DropList>
      </div>
    );
  }
}
