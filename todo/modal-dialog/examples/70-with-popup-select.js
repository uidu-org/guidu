// @flow

import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { PopupSelect } from '@atlaskit/select';
import ModalDialog from '../src';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const onChange = console.log;
const defaults = { options, placeholder: 'Choose a City', onChange };

function onClose() {
  console.log('the "onClose" handler is fired');
}

export default class ModalWithPopupSelect extends Component<{}> {
  render() {
    return (
      <ThemeProvider theme={{}}>
        <ModalDialog onClose={onClose}>
          <PopupSelect
            {...defaults}
            target={({ ref }) => <button ref={ref}>Click me</button>}
            popperProps={{ placement: 'bottom', positionFixed: true }}
            searchThreshold={10}
          />
        </ModalDialog>
      </ThemeProvider>
    );
  }
}
