// @flow
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import Modal, { ModalTransition } from '../src';

const sizes = ['large', 'medium', 'small'];
type State = { isOpen: Array<any> };
export default class NestedDemo extends Component<{}, State> {
  state = { isOpen: [] };
  open = (isOpen: string) => {
    const openModals = this.state.isOpen.slice(0);
    openModals.push(isOpen);
    this.setState({ isOpen: openModals });
  };
  close = () => {
    const openModals = this.state.isOpen.slice(0);
    openModals.pop();
    this.setState({ isOpen: openModals });
  };
  handleStackChange = (idx: number, name: string) => {
    console.info(`"${name}" stack change`, idx);
    console.log(`"${name}" stack change ${idx}`);
  };
  handleCloseComplete = () => {
    console.info(
      `The exit animation of the "${sizes[0]}" modal has completed.`,
    );
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <ButtonGroup>
          {sizes.map(name => (
            <Button key={name} onClick={() => this.open(name)}>
              Open: {name}
            </Button>
          ))}
        </ButtonGroup>
        <p>
          For illustrative purposes three {'"stacked"'} modals can be opened in
          this demo, though ADG3 recommends only two at any time.
        </p>
        <p>
          Check the storybook{"'"}s {'"action logger"'} (or your console) to see
          how you can make use of the <code>onStackChange</code> property.
        </p>

        {sizes.map(name => {
          const next = sizes[sizes.indexOf(name) + 1];
          const onClick = next ? () => this.open(next) : undefined;
          const actions = [{ text: 'Close', onClick: this.close }];
          if (next) actions.push({ text: `Open: ${next}`, onClick });

          return (
            <ModalTransition key={name}>
              {isOpen.includes(name) && (
                <Modal
                  actions={actions}
                  autoFocus
                  onClose={this.close}
                  onCloseComplete={next && this.handleCloseComplete}
                  onStackChange={
                    next ? id => this.handleStackChange(id, name) : undefined
                  }
                  heading={`Modal: ${name}`}
                  width={name}
                >
                  <Lorem count={2} />
                </Modal>
              )}
            </ModalTransition>
          );
        })}
      </div>
    );
  }
}
