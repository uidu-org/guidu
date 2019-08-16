// @flow
import Button from '@uidu/button';
import Form from '@uidu/form';
import { RadioGroup } from '@uidu/radio';
import React, { PureComponent } from 'react';
import Lorem from 'react-lorem-component';
import styled from 'styled-components';
import Modal, { ModalTransition } from '../src';

const TallContainer = styled.div`
  height: 2000px;
`;

const scrollBehaviors = [
  {
    id: 'inside',
    name: 'inside',
  },
  { name: 'outside', id: 'outside' },
];

type State = {
  isOpen: boolean,
  scrollBehavior: 'inside' | 'outside',
};
export default class ExampleScroll extends PureComponent<{}, State> {
  bottomRef: any;
  state: State = {
    isOpen: false,
    scrollBehavior: 'inside',
  };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  scrollToBottom = () => this.bottomRef.scrollIntoView(true);

  onScrollBehaviorChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isOpen, scrollBehavior } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
      { text: 'Scroll to bottom', onClick: this.scrollToBottom },
    ];

    return (
      <TallContainer>
        <p>
          The scroll behavior of modals can be configured so that scrolling
          happens inside the modal body or outside the modal, within the
          viewport.
        </p>
        <p>
          In either case, modals prevent the window from being scrolled both
          natively and programatically. This means that certain browser issues
          such as <code>scrollIntoView</code> scrolling the window instead of
          only the closest scroll parent will be prevented.
        </p>
        <Form>
          <RadioGroup
            options={scrollBehaviors}
            label="Scroll behavior:"
            onChange={this.onScrollBehaviorChange}
            name="scrollBehavior"
            value="inside"
          />
        </Form>
        <Button onClick={this.open}>Open Modal</Button>
        <ModalTransition>
          {isOpen && (
            <Modal
              actions={actions}
              onClose={this.close}
              heading="Modal Title"
              scrollBehavior={scrollBehavior}
            >
              <Lorem count={10} />
              <div
                ref={r => {
                  this.bottomRef = r;
                }}
              />
            </Modal>
          )}
        </ModalTransition>
      </TallContainer>
    );
  }
}
