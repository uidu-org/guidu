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
import { Appearance } from '../src/types';

const appearances: Appearance[] = ['warning', 'danger'];

interface State {
  isOpen: string | null;
}

export default class ExampleAppearance extends React.PureComponent<{}, State> {
  state = { isOpen: null };

  open = (isOpen: string) => this.setState({ isOpen });

  close = () => this.setState({ isOpen: null });

  secondaryAction = ({ currentTarget }: React.MouseEvent<HTMLElement>) =>
    console.log(currentTarget.innerText);

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    return (
      <div>
        <ButtonGroup>
          {appearances.map((name) => (
            <Button key={`${name}-trigger`} onClick={() => this.open(name)}>
              Open: {name}
            </Button>
          ))}
        </ButtonGroup>

        <ModalTransition>
          {appearances
            .filter((a) => a === isOpen)
            .map((name) => (
              <Modal key="active-modal" actions={actions} onClose={this.close}>
                <ModalHeader>
                  <ModalTitle appearance={name}>{`Modal: ${name}`}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <Lorem count={2} />
                </ModalBody>
                <ModalFooter>
                  <ButtonGroup>
                    {actions.map((action) => (
                      <Button onClick={action.onClick}>{action.text}</Button>
                    ))}
                  </ButtonGroup>
                </ModalFooter>
              </Modal>
            ))}
        </ModalTransition>
      </div>
    );
  }
}
