// @flow
import React, { Component, type Node } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';

import Avatar from '@atlaskit/avatar';
import Button, { ButtonGroup } from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import InlineDialog from '@atlaskit/inline-dialog';
import { colors } from '@atlaskit/theme';

import ModalDialog, { ModalFooter, ModalTransition } from '../src';

const defaults = ['header', 'footer', 'both', 'neither'];
const custom = ['custom header', 'custom body', 'custom footer'];
const variants = defaults.concat(custom);

const H4 = styled.h4`
  margin-bottom: 0.66em;
`;

const Hint = styled.span`
  align-items: center;
  color: ${colors.subtleText};
  cursor: help;
  display: flex;
`;
const HintText = styled.span`
  margin-left: 1em;
`;
const headerStyles = {
  background:
    'url(https://atlassian.design/react_assets/images/cards/personality.png) center top no-repeat',
  backgroundSize: 'cover',
  borderRadius: '4px 4px 0 0',
  paddingTop: 170,
  position: 'relative',
};
const Header = ({ onClose }: { onClose: Function }) => (
  <div style={headerStyles}>
    <span style={{ position: 'absolute', right: 0, top: 4 }}>
      <Button onClick={onClose} appearance="link">
        <CrossIcon
          label="Close Modal"
          primaryColor={colors.R400}
          size="small"
        />
      </Button>
    </span>
  </div>
);

const bodyStyles = {
  padding: 90,
  backgroundColor: colors.N30,
  overflowY: 'auto',
  overflowX: 'hidden',
};

// $FlowFixMe
const Body = React.forwardRef((props: { children?: Node }, ref) => {
  return (
    <div ref={ref} style={bodyStyles}>
      {props.children}
    </div>
  );
});

type FooterProps = {
  onClose: Function,
  showKeyline: boolean,
};
type FooterState = {
  isOpen: boolean,
};

// eslint-disable-next-line react/no-multi-comp
class Footer extends Component<FooterProps, FooterState> {
  state = { isOpen: false };
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const { onClose, showKeyline } = this.props;
    const { isOpen } = this.state;

    return (
      <ModalFooter showKeyline={showKeyline}>
        <InlineDialog
          content="Some hint text?"
          isOpen={isOpen}
          position="top left"
        >
          <Hint onMouseEnter={this.open} onMouseLeave={this.close}>
            <Avatar size="small" />
            <HintText>Hover Me!</HintText>
          </Hint>
        </InlineDialog>
        <Button appearance="subtle" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    );
  }
}

type State = { isOpen: string | null };
// eslint-disable-next-line react/no-multi-comp
export default class ModalDemo extends Component<{}, State> {
  state = { isOpen: null };
  close = (isOpen: any) => this.setState({ isOpen });
  open = (isOpen: string) => this.setState({ isOpen });
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
        <H4>Default Header/Footer</H4>
        <ButtonGroup>{defaults.map(btn)}</ButtonGroup>

        <H4>Custom Components</H4>
        <ButtonGroup>{custom.map(btn)}</ButtonGroup>

        <ModalTransition>
          {variants
            .filter(w => w === isOpen)
            .map(name => (
              <ModalDialog
                key={name}
                actions={
                  ['footer', 'both'].includes(name) ? actions : undefined
                }
                components={{
                  Header: name === 'custom header' ? Header : undefined,
                  Body: name === 'custom body' ? Body : undefined,
                  Footer: name === 'custom footer' ? Footer : undefined,
                  Container: 'div',
                }}
                heading={
                  ['header', 'both'].includes(name)
                    ? `Modal: ${name}`
                    : undefined
                }
                onClose={this.close}
                width={name === 'custom header' ? 300 : undefined}
                {...this.props}
              >
                <Lorem count="5" />
              </ModalDialog>
            ))}
        </ModalTransition>
      </div>
    );
  }
}
