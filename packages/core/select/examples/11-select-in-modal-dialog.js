// @flow
import React, { Component } from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base';

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Button from '@uidu/button';
import Select from '../src';

type State = {
  isOpen: boolean,
};

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

export default class SelectInModal extends Component<{}, State> {
  state: State = { isOpen: false };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    const actions = [{ text: 'Close', onClick: this.close }];

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>

        <ModalTransition>
          {isOpen && (
            <Modal actions={actions} onClose={this.close} heading="Modal Title">
              <Form {...formDefaultProps}>
                <Select
                  {...inputDefaultProps}
                  getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
                  menuPortalTarget={document.body}
                  isMulti
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  defaultValue={options.slice(3)}
                  options={options}
                  placeholder="Choose a City"
                />
              </Form>
            </Modal>
          )}
        </ModalTransition>
      </div>
    );
  }
}
