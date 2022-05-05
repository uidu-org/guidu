import Button, { ButtonGroup } from '@uidu/button';
import React from 'react';
import Lorem from 'react-lorem-component';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '../src';

interface State {
  isOpen: boolean;
}
export default class ExampleBasic extends React.PureComponent<{}, State> {
  state: State = { isOpen: false };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  secondaryAction = ({ target }: any) => console.log(target.innerText);

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>

        <ModalTransition>
          {isOpen && (
            <Modal
              actions={actions}
              onClose={this.close}
              tw="--modal-dialog-gutter[1rem]"
              width="calc(100vw - 2rem)"
            >
              <ModalHeader>
                <ModalTitle>Modal title</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <div tw="space-y-8">
                  <Lorem count={2} />
                  <Lorem count={4} />
                  <Lorem count={4} />
                  <Lorem count={4} />
                </div>
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button onClick={this.close}>Close</Button>
                  <Button appearance="primary">Save</Button>
                </ButtonGroup>
              </ModalFooter>
            </Modal>
          )}
        </ModalTransition>
      </div>
    );
  }
}
