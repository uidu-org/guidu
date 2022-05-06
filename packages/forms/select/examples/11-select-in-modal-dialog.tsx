import Button from '@uidu/button';
import { Form } from '@uidu/form';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@uidu/modal-dialog';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import Select from '../src';

type State = {
  isOpen: boolean;
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
            <Modal onClose={this.close}>
              <ModalHeader>
                <ModalTitle>Modal title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Form {...formDefaultProps}>
                  <Select
                    {...inputDefaultProps}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    menuPortalTarget={document.body}
                    multiple
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    defaultValue={options.slice(3)}
                    options={options}
                    placeholder="Choose a City"
                  />
                </Form>
              </ModalBody>
              <ModalFooter>
                {actions.map((action) => (
                  <Button onClick={action.onClick}>{action.text}</Button>
                ))}
              </ModalFooter>
            </Modal>
          )}
        </ModalTransition>
      </div>
    );
  }
}
