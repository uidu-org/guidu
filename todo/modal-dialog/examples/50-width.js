// @flow
import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Lorem from 'react-lorem-component';
import Button, { ButtonGroup } from '@atlaskit/button';

import { WIDTH_ENUM } from '../src/shared-variables';
import ModalDialog, { ModalTransition } from '../src';

const units = [420, '42%', '42em'];
const sizes = WIDTH_ENUM.values;
const allWidths = sizes.concat(units);
const H4 = styled.h4`
  margin-bottom: 0.66em;
`;

export default class ModalDemo extends Component<{}, { isOpen: any }> {
  state = { isOpen: null };
  open = (isOpen: any) => this.setState({ isOpen });
  close = (isOpen: any) => this.setState({ isOpen });
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
      <ThemeProvider theme={{}}>
        <div style={{ padding: 16 }}>
          <H4>Sizes</H4>
          <ButtonGroup>{sizes.map(btn)}</ButtonGroup>
          <H4>Units</H4>
          <ButtonGroup>{units.map(btn)}</ButtonGroup>

          <ModalTransition>
            {allWidths
              .filter(w => w === isOpen)
              .map(name => (
                <ModalDialog
                  actions={actions}
                  key={name}
                  onClose={this.close}
                  heading={`Modal: ${String(name)}`}
                  width={name}
                  {...this.props}
                >
                  <Lorem count="1" />
                </ModalDialog>
              ))}
          </ModalTransition>
        </div>
      </ThemeProvider>
    );
  }
}
