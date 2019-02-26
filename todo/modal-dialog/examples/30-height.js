// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';
import ModalDialog, { ModalTransition } from '../src';

const units = [420, '42em', '100%'];
const H4 = styled.h4`
  margin-bottom: 0.66em;
`;

type State = { isOpen: any };

export default class ModalDemo extends Component<{}, State> {
  state = { isOpen: null };
  close = (isOpen: any) => this.setState({ isOpen });
  open = (isOpen: any) => this.setState({ isOpen });
  secondaryAction = ({ target }: Object) => console.log(target.innerText);

  render() {
    const { isOpen } = this.state;
    const btn = name => (
      <Button key={name} onClick={() => this.open(name)}>
        {name}
      </Button>
    );
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div style={{ padding: 16 }}>
        <H4>Units</H4>
        <ButtonGroup>{units.map(btn)}</ButtonGroup>

        <ModalTransition>
          {units
            .filter(w => w === isOpen)
            .map(name => (
              <ModalDialog
                actions={actions}
                key={name}
                onClose={this.close}
                heading={`Modal: ${name}`}
                height={name}
                {...this.props}
              >
                <Lorem count="1" />
              </ModalDialog>
            ))}
        </ModalTransition>
      </div>
    );
  }
}
